const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { Resend } = require("resend");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// =====================================================
// CLOUDINARY CONFIGURATION
// =====================================================
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// =====================================================
// MULTER CONFIGURATION
// =====================================================
// Store uploaded image temporarily in memory
const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },

  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed."));
    }
  },
});

// =====================================================
// MONGODB CONNECTION
// =====================================================
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });

// =====================================================
// RESEND EMAIL
// =====================================================
const resend = new Resend(process.env.RESEND_API_KEY);

const SARALA_EMAIL = "khondsarala@gmail.com";

// =====================================================
// APPLICATION SCHEMA
// =====================================================
const applicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    mode: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model(
  "Application",
  applicationSchema
);

// =====================================================
// GALLERY SCHEMA
// =====================================================
const gallerySchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  }
);

const Gallery = mongoose.model(
  "Gallery",
  gallerySchema
);

// =====================================================
// SEND APPLICATION EMAIL
// =====================================================
async function sendApplicationEmail(application) {
  const {
    name,
    phone,
    mode,
    message,
  } = application;

  const { data, error } = await resend.emails.send({
    from: "Sarala Mehendi Academy <onboarding@resend.dev>",

    to: [SARALA_EMAIL],

    subject: `New Student Application - ${name}`,

    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">

        <h2>New Student Application</h2>

        <p>
          A new student has submitted the form
          on Sarala's Mehendi Academy website.
        </p>

        <hr>

        <h3>Student Details</h3>

        <p>
          <strong>Name:</strong> ${name}
        </p>

        <p>
          <strong>Phone:</strong> ${phone}
        </p>

        <p>
          <strong>Mode:</strong> ${mode}
        </p>

        <p>
          <strong>Message:</strong>
          ${message || "No message provided"}
        </p>

        <hr>

        <p>
          <strong>
            Please contact the student on the phone number above.
          </strong>
        </p>

      </div>
    `,
  });

  if (error) {
    throw new Error(JSON.stringify(error));
  }

  console.log("Email sent successfully:", data);

  return data;
}

// =====================================================
// ADMIN AUTHENTICATION MIDDLEWARE
// =====================================================
function verifyAdmin(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Admin authentication required.",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token.",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required.",
      });
    }

    req.admin = decoded;

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired admin token.",
    });
  }
}

// =====================================================
// TEST EMAIL ROUTE
// =====================================================
app.get("/test-email", async (req, res) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Sarala Mehendi Academy <onboarding@resend.dev>",

      to: [SARALA_EMAIL],

      subject: "Test Email - Sarala Mehendi Academy",

      html: `
        <h2>Email system is working!</h2>

        <p>
          This is a test email from
          Sarala's Mehendi Academy website.
        </p>
      `,
    });

    if (error) {
      throw new Error(JSON.stringify(error));
    }

    console.log("Test email sent:", data);

    res.json({
      success: true,
      message: "Test email sent successfully!",
    });

  } catch (error) {
    console.error("Email error:", error.message);

    res.status(500).json({
      success: false,
      message: "Test email failed.",
      error: error.message,
    });
  }
});

// =====================================================
// ADMIN LOGIN
// =====================================================
app.post("/api/admin/login", async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    // Check email
    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Check password
    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        email: process.env.ADMIN_EMAIL,
        role: "admin",
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "1d",
      }
    );

    console.log("Admin login successful.");

    res.json({
      success: true,
      message: "Login successful!",
      token,
    });

  } catch (error) {
    console.error(
      "Admin login error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Login failed.",
    });
  }
});

// =====================================================
// HOME ROUTE
// =====================================================
app.get("/", (req, res) => {
  res.json({
    message:
      "Sarala's Mehendi Academy server is running!",
  });
});

// =====================================================
// RECEIVE APPLICATION
// =====================================================
app.post("/api/applications", async (req, res) => {
  try {
    const {
      name,
      phone,
      mode,
      message,
    } = req.body;

    // Check required fields
    if (!name || !phone || !mode) {
      return res.status(400).json({
        success: false,
        message:
          "Name, phone and mode are required.",
      });
    }

    // Save application
    const newApplication = new Application({
      name,
      phone,
      mode,
      message,
    });

    await newApplication.save();

    console.log("New Application Saved:");
    console.log(newApplication);

    // Send email
    await sendApplicationEmail({
      name,
      phone,
      mode,
      message,
    });

    console.log(
      "Sarala has been notified by email."
    );

    res.status(201).json({
      success: true,
      message:
        "Application submitted successfully! Sarala has been notified.",
    });

  } catch (error) {
    console.error(
      "Error processing application:"
    );

    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Application could not be processed. Please try again.",
    });
  }
});

// =====================================================
// GET ALL APPLICATIONS
// =====================================================
// Only Sarala/admin can see student applications.
app.get(
  "/api/applications",
  verifyAdmin,
  async (req, res) => {
    try {
      const applications =
        await Application.find()
          .sort({ createdAt: -1 });

      res.json({
        success: true,
        applications,
      });

    } catch (error) {
      console.error(
        "Error fetching applications:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch applications.",
      });
    }
  }
);

// =====================================================
// CLOUDINARY UPLOAD FUNCTION
// =====================================================
function uploadToCloudinary(buffer) {
  return new Promise((resolve, reject) => {

    const stream =
      cloudinary.uploader.upload_stream(
        {
          folder:
            "sarala-mehendi-academy/gallery",

          resource_type: "image",
        },

        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

    stream.end(buffer);
  });
}

// =====================================================
// ADMIN - UPLOAD GALLERY PHOTO
// =====================================================
app.post(
  "/api/gallery/upload",
  verifyAdmin,
  upload.single("image"),
  async (req, res) => {

    try {

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Please select an image.",
        });
      }

      console.log(
        "Uploading image to Cloudinary..."
      );

      // Upload image to Cloudinary
      const result =
        await uploadToCloudinary(
          req.file.buffer
        );

      console.log(
        "Cloudinary upload successful:",
        result.secure_url
      );

      // Save image information in MongoDB
      const galleryImage =
        new Gallery({
          imageUrl:
            result.secure_url,

          publicId:
            result.public_id,
        });

      await galleryImage.save();

      console.log(
        "Gallery image saved to MongoDB:"
      );

      console.log(galleryImage);

      res.status(201).json({
        success: true,
        message:
          "Photo uploaded successfully!",

        image: galleryImage,
      });

    } catch (error) {

      console.error(
        "Gallery upload error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Photo upload failed.",
        error:
          error.message,
      });
    }
  }
);

// =====================================================
// PUBLIC - GET GALLERY PHOTOS
// =====================================================
app.get(
  "/api/gallery",
  async (req, res) => {

    try {

      const images =
        await Gallery.find()
          .sort({ createdAt: -1 });

      res.json({
        success: true,
        images,
      });

    } catch (error) {

      console.error(
        "Error fetching gallery:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to load gallery.",
      });
    }
  }
);

// =====================================================
// ADMIN - DELETE GALLERY PHOTO
// =====================================================
app.delete(
  "/api/gallery/:id",
  verifyAdmin,
  async (req, res) => {

    try {

      const image =
        await Gallery.findById(
          req.params.id
        );

      if (!image) {
        return res.status(404).json({
          success: false,
          message:
            "Gallery image not found.",
        });
      }

      // Delete from Cloudinary
      await cloudinary.uploader.destroy(
        image.publicId
      );

      // Delete from MongoDB
      await Gallery.findByIdAndDelete(
        req.params.id
      );

      console.log(
        "Gallery image deleted:",
        image.publicId
      );

      res.json({
        success: true,
        message:
          "Photo deleted successfully!",
      });

    } catch (error) {

      console.error(
        "Gallery delete error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to delete photo.",
      });
    }
  }
);

// =====================================================
// ERROR HANDLER FOR MULTER
// =====================================================
app.use(
  (error, req, res, next) => {

    if (
      error instanceof multer.MulterError
    ) {

      return res.status(400).json({
        success: false,
        message:
          "Image upload error: " +
          error.message,
      });
    }

    if (
      error &&
      error.message ===
        "Only image files are allowed."
    ) {

      return res.status(400).json({
        success: false,
        message:
          "Only image files are allowed.",
      });
    }

    next(error);
  }
);

// =====================================================
// START SERVER
// =====================================================
const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on http://localhost:${PORT}`
  );

});