import { useEffect, useState } from "react";

// =====================================================
// EXISTING WEBSITE IMAGES
// =====================================================

const images = import.meta.glob(
  "../assets/images/**/*.{jpg,jpeg,png}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

const upperCaseImages = import.meta.glob(
  "../assets/images/**/*.{JPG,JPEG,PNG}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

const allImages = {
  ...images,
  ...upperCaseImages,
};

// =====================================================
// CREATE EXISTING GALLERY DATA
// =====================================================

const staticPhotos = Object.entries(allImages)
  .map(([path, image]) => {
    const parts = path.split("/");

    const folder = parts[parts.length - 2];

    let category = "";

    if (folder === "mehendi-work") {
      category = "Mehendi Work";
    } else if (folder === "academy-classes") {
      category = "Academy & Classes";
    } else if (folder === "student-achievements") {
      category = "Student Achievements";
    } else if (folder === "student-kit") {
      category = "Student Kit";
    } else {
      return null;
    }

    const fileName = parts[parts.length - 1]
      .replace(/\.[^/.]+$/, "")
      .replace(/[_-]/g, " ");

    return {
      image,
      category,
      title: fileName,
      type: "static",
    };
  })
  .filter(Boolean);

// =====================================================
// PUBLIC GALLERY
// =====================================================

function Gallery() {
  const [activeCategory, setActiveCategory] =
    useState("All");

  const [uploadedPhotos, setUploadedPhotos] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // ===================================================
  // LOAD PHOTOS FROM DATABASE
  // ===================================================

  const loadUploadedPhotos = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "https://sarala-mehendi-api.onrender.com/api/gallery"
      );

      const data = await response.json();

      console.log(
        "Uploaded gallery photos:",
        data
      );

      if (data.success) {
        const cloudinaryPhotos =
          data.images.map((item) => ({
            image: item.imageUrl,

            category: "New Uploads",

            title: "Sarala's Mehendi Academy",

            type: "uploaded",

            id: item._id,
          }));

        setUploadedPhotos(
          cloudinaryPhotos
        );
      }
    } catch (error) {
      console.error(
        "Gallery loading error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // ===================================================
  // LOAD WHEN PAGE OPENS
  // ===================================================

  useEffect(() => {
    loadUploadedPhotos();
  }, []);

  // ===================================================
  // COMBINE OLD + NEW PHOTOS
  // ===================================================

  const photos = [
    ...uploadedPhotos,
    ...staticPhotos,
  ];

  // ===================================================
  // CATEGORIES
  // ===================================================

  const categories = [
    "All",
    "Mehendi Work",
    "Academy & Classes",
    "Student Achievements",
    "Student Kit",
    "New Uploads",
  ];

  // ===================================================
  // FILTER
  // ===================================================

  const filteredPhotos =
    activeCategory === "All"
      ? photos
      : photos.filter(
          (photo) =>
            photo.category ===
            activeCategory
        );

  // ===================================================
  // PAGE
  // ===================================================

  return (
    <section
      id="gallery"
      style={{
        padding: "90px 20px",
        background: "#fff7fb",
      }}
    >

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >

        {/* =========================================
            HEADING
        ========================================== */}

        <div
          style={{
            textAlign: "center",
            marginBottom: "45px",
          }}
        >

          <p
            style={{
              color: "#e50075",
              fontWeight: "700",
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: "10px",
            }}
          >
            Our Work & Memories
          </p>

          <h2
            style={{
              fontSize: "48px",
              margin: "0",
              color: "#111827",
            }}
          >
            Gallery
          </h2>

          <p
            style={{
              maxWidth: "650px",
              margin: "15px auto 0",
              color: "#526174",
              fontSize: "17px",
              lineHeight: "1.7",
            }}
          >
            Explore beautiful Mehendi work,
            academy moments, student
            achievements and learning kits
            provided with our courses.
          </p>

        </div>

        {/* =========================================
            CATEGORY BUTTONS
        ========================================== */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "40px",
          }}
        >

          {categories.map((category) => (

            <button
              key={category}
              onClick={() =>
                setActiveCategory(
                  category
                )
              }
              style={{
                padding:
                  "11px 20px",

                border:
                  activeCategory ===
                  category
                    ? "2px solid #e50075"
                    : "2px solid #f3b5d3",

                borderRadius: "25px",

                background:
                  activeCategory ===
                  category
                    ? "#e50075"
                    : "white",

                color:
                  activeCategory ===
                  category
                    ? "white"
                    : "#e50075",

                fontWeight: "600",

                cursor: "pointer",

                transition: "0.3s",
              }}
            >
              {category}
            </button>

          ))}

        </div>

        {/* =========================================
            LOADING
        ========================================== */}

        {loading ? (

          <div
            style={{
              textAlign: "center",
              padding: "50px",
              color: "#777",
            }}
          >
            Loading gallery...
          </div>

        ) : filteredPhotos.length > 0 ? (

          /* =======================================
             PHOTOS
          ======================================== */

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "22px",
            }}
          >

            {filteredPhotos.map(
              (photo, index) => (

                <div
                  key={
                    photo.id ||
                    `${photo.image}-${index}`
                  }
                  style={{
                    position:
                      "relative",

                    height: "330px",

                    overflow:
                      "hidden",

                    borderRadius:
                      "20px",

                    background:
                      "#f5f5f5",

                    boxShadow:
                      "0 8px 25px rgba(0,0,0,0.08)",
                  }}
                >

                  {/* IMAGE */}

                  <img
                    src={photo.image}
                    alt={
                      photo.title
                    }
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit:
                        "cover",
                      display:
                        "block",
                    }}
                  />

                  {/* LABEL */}

                  <div
                    style={{
                      position:
                        "absolute",

                      left: "0",
                      right: "0",
                      bottom: "0",

                      padding:
                        "35px 18px 18px",

                      background:
                        "linear-gradient(transparent, rgba(0,0,0,0.75))",

                      color: "white",
                    }}
                  >

                    <div
                      style={{
                        fontWeight:
                          "700",

                        fontSize:
                          "17px",
                      }}
                    >
                      {photo.category}
                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        ) : (

          /* =======================================
             NO PHOTOS
          ======================================== */

          <div
            style={{
              textAlign: "center",
              padding: "50px",
              color: "#777",
            }}
          >
            No photos found in
            this category.
          </div>

        )}

      </div>

    </section>
  );
}

export default Gallery;   