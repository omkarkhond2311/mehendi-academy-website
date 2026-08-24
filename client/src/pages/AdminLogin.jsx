import { useState } from "react";

const API_URL = "https://sarala-mehendi-api.onrender.com";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/admin/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      console.log("Login response:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Login failed."
        );
      }

      // Save login status
      localStorage.setItem(
        "adminLoggedIn",
        "true"
      );

      // IMPORTANT: Save JWT token
      localStorage.setItem(
        "adminToken",
        data.token
      );

      alert("Login successful! 🎉");

      // Go to gallery
      window.location.href =
        "/admin/gallery";

    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      alert(
        error.message ||
          "Invalid email or password."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>

      <div style={styles.card}>

        <h1>Admin Login</h1>

        <p>
          Sarala's Mehendi Academy
        </p>

        <form onSubmit={handleLogin}>

          {/* EMAIL */}

          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            style={styles.input}
          />

          {/* PASSWORD */}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={styles.input}
          />

          {/* LOGIN */}

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f8f4f0",
    padding: "20px",
    boxSizing: "border-box",
  },

  card: {
    width: "350px",
    maxWidth: "100%",
    padding: "35px",
    background: "white",
    borderRadius: "15px",
    boxShadow:
      "0 5px 25px rgba(0,0,0,0.15)",
    textAlign: "center",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    boxSizing: "border-box",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "16px",
  },

  button: {
    width: "100%",
    padding: "12px",
    marginTop: "20px",
    border: "none",
    borderRadius: "8px",
    background: "#8b4513",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default AdminLogin;