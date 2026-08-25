import { useEffect, useState } from "react";

const API_URL = "https://sarala-mehendi-api.onrender.com";

function AdminGallery() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [galleryLoading, setGalleryLoading] = useState(true);

  // ===============================
  // CHECK ADMIN LOGIN
  // ===============================
  const isLoggedIn = localStorage.getItem("adminLoggedIn");

  if (isLoggedIn !== "true") {
    window.location.href = "/admin";
    return null;
  }

  // ===============================
  // GET ADMIN TOKEN
  // ===============================
  const getToken = () => {
    return localStorage.getItem("adminToken");
  };

  // ===============================
  // LOAD GALLERY
  // ===============================
  const loadGallery = async () => {
    try {
      setGalleryLoading(true);

      const response = await fetch(
        `${API_URL}/api/gallery`
      );

      const data = await response.json();

      console.log("Gallery data:", data);

      if (data.success) {
        setImages(data.images);
      }
    } catch (error) {
      console.error("Gallery loading error:", error);
      alert("Could not load gallery photos.");
    } finally {
      setGalleryLoading(false);
    }
  };

  // ===============================
  // LOAD GALLERY ON PAGE OPEN
  // ===============================
  useEffect(() => {
    loadGallery();
  }, []);

  // ===============================
  // SELECT IMAGE
  // ===============================
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    // Image check
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    // 10 MB limit
    if (file.size > 10 * 1024 * 1024) {
      alert("Image must be smaller than 10 MB.");
      return;
    }

    setImage(file);

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };

  // ===============================
  // UPLOAD IMAGE
  // ===============================
  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image first.");
      return;
    }

    const token = getToken();

    if (!token) {
      alert("Admin login session expired. Please login again.");

      localStorage.removeItem("adminLoggedIn");
      localStorage.removeItem("adminToken");

      window.location.href = "/admin";

      return;
    }

    try {
      setLoading(true);

      console.log("Starting image upload...");

      const formData = new FormData();

      formData.append("image", image);

      const response = await fetch(
        `${API_URL}/api/gallery/upload`,
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: formData,
        }
      );

      const data = await response.json();

      console.log("Upload response:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Upload failed."
        );
      }

      alert("Photo uploaded successfully! 🎉");

      // Clear selected image
      setImage(null);
      setPreview(null);

      // Clear file input
      const fileInput =
        document.getElementById("gallery-file");

      if (fileInput) {
        fileInput.value = "";
      }

      // Reload gallery
      await loadGallery();

    } catch (error) {
      console.error("Upload error:", error);

      alert(
        error.message || "Photo upload failed."
      );
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // DELETE IMAGE
  // ===============================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this photo?"
    );

    if (!confirmDelete) {
      return;
    }

    const token = getToken();

    if (!token) {
      alert("Admin login session expired.");

      window.location.href = "/admin";

      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/gallery/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Delete failed."
        );
      }

      alert("Photo deleted successfully!");

      await loadGallery();

    } catch (error) {
      console.error("Delete error:", error);

      alert(
        error.message ||
          "Photo could not be deleted."
      );
    }
  };

  // ===============================
  // LOGOUT
  // ===============================
  const logout = () => {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminToken");

    window.location.href = "/admin";
  };

  // ===============================
  // PAGE
  // ===============================
  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>

        <div>
          <h1 style={styles.title}>
            Sarala's Mehendi Academy
          </h1>

          <p style={styles.subtitle}>
            Gallery Management
          </p>
        </div>

        <button
          onClick={logout}
          style={styles.logout}
        >
          Logout
        </button>

      </div>

      {/* UPLOAD CARD */}
      <div style={styles.card}>

        <h2>Add Gallery Photo</h2>

        <p style={styles.description}>
          Select a photo from your phone or
          laptop and add it to the website
          gallery.
        </p>

        {/* FILE SELECT */}
        <input
          id="gallery-file"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={styles.fileInput}
        />

        {/* PREVIEW */}
        {preview && (
          <div style={styles.preview}>

            <p>
              <strong>Selected Photo</strong>
            </p>

            <img
              src={preview}
              alt="Selected preview"
              style={styles.previewImage}
            />

            <p style={styles.fileName}>
              {image?.name}
            </p>

          </div>
        )}

        {/* UPLOAD BUTTON */}
        <button
          onClick={handleUpload}
          disabled={loading || !image}
          style={{
            ...styles.upload,
            opacity:
              loading || !image ? 0.6 : 1,
            cursor:
              loading || !image
                ? "not-allowed"
                : "pointer",
          }}
        >
          {loading
            ? "Uploading..."
            : "⬆️ Upload Photo"}
        </button>

      </div>

      {/* CURRENT GALLERY */}
      <div style={styles.gallerySection}>

        <h2>Current Gallery</h2>

        {galleryLoading ? (
          <p>Loading gallery...</p>
        ) : images.length === 0 ? (

          <div style={styles.empty}>
            <p>No photos uploaded yet.</p>
            <p>
              Add your first gallery photo
              above.
            </p>
          </div>

        ) : (

          <div style={styles.galleryGrid}>

            {images.map((item) => (

              <div
                key={item._id}
                style={styles.galleryCard}
              >

                <img
                  src={item.imageUrl}
                  alt="Gallery"
                  style={styles.galleryImage}
                />

                <button
                  onClick={() =>
                    handleDelete(item._id)
                  }
                  style={styles.delete}
                >
                  🗑️ Delete
                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

// ===============================
// STYLES
// ===============================

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f8f4f0",
    padding: "30px",
    boxSizing: "border-box",
  },

  header: {
    maxWidth: "1100px",
    margin: "0 auto 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
  },

  title: {
    margin: 0,
    color: "#5c321b",
  },

  subtitle: {
    marginTop: "5px",
    color: "#777",
  },

  logout: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    background: "#333",
    color: "white",
    cursor: "pointer",
    fontSize: "14px",
  },

  card: {
    maxWidth: "650px",
    margin: "0 auto",
    padding: "30px",
    background: "white",
    borderRadius: "15px",
    boxShadow:
      "0 5px 25px rgba(0,0,0,0.12)",
    boxSizing: "border-box",
  },

  description: {
    color: "#666",
    lineHeight: 1.6,
  },

  fileInput: {
    width: "100%",
    marginTop: "20px",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxSizing: "border-box",
    background: "#fafafa",
  },

  preview: {
    marginTop: "25px",
    textAlign: "center",
  },

  previewImage: {
    width: "100%",
    maxWidth: "450px",
    maxHeight: "400px",
    objectFit: "contain",
    borderRadius: "12px",
    marginTop: "10px",
  },

  fileName: {
    color: "#666",
    wordBreak: "break-word",
  },

  upload: {
    width: "100%",
    marginTop: "25px",
    padding: "14px",
    border: "none",
    borderRadius: "8px",
    background: "#8b4513",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
  },

  gallerySection: {
    maxWidth: "1100px",
    margin: "50px auto",
  },

  empty: {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    textAlign: "center",
    color: "#777",
  },

  galleryGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "25px",
    marginTop: "20px",
  },

  galleryCard: {
    background: "white",
    padding: "12px",
    borderRadius: "12px",
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.1)",
  },

  galleryImage: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    borderRadius: "8px",
    display: "block",
  },

  delete: {
    width: "100%",
    marginTop: "10px",
    padding: "10px",
    border: "none",
    borderRadius: "7px",
    background: "#b3261e",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default AdminGallery;