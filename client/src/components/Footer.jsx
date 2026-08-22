import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      style={{
        background: "#2b1720",
        color: "white",
        padding: "35px 20px 20px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <h3
          style={{
            marginBottom: "10px",
          }}
        >
          Sarala's Mehendi Academy
        </h3>

        <p
          style={{
            color: "#ddd",
            marginBottom: "25px",
          }}
        >
          Learn beautiful Mehendi art with
          professional guidance.
        </p>

        <div
          style={{
            marginBottom: "25px",
          }}
        >
          <Link
            to="/admin"
            style={{
              color: "#ffd6e7",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            🔐 Admin Login
          </Link>
        </div>

        <hr
          style={{
            border: "none",
            borderTop:
              "1px solid rgba(255,255,255,0.2)",
            marginBottom: "20px",
          }}
        />

        <p
          style={{
            fontSize: "13px",
            color: "#bbb",
            margin: 0,
          }}
        >
          © 2026 Sarala's Mehendi Academy.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;