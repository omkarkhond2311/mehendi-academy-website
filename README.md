# 🌸 Sarala's Mehendi Academy Website

A modern, responsive website developed for **Sarala's Mehendi Academy** to showcase the academy, courses, mehendi work, student achievements, and provide an easy way for students to contact/apply.

The website also includes a secure admin area where the academy owner can manage gallery photos.

---

## 🌐 Project Features

### 👩‍🎨 Public Website

- Beautiful responsive homepage
- Hero section
- About the academy
- Services
- Mehendi courses/classes
- Gallery
- Student achievements
- Student kit information
- Contact/Application form
- Responsive design for mobile, tablet and laptop

### 🔐 Admin Features

- Admin login
- Protected admin gallery page
- Upload gallery photos
- View current gallery
- Delete gallery photos
- Admin-only gallery management

### 📧 Application System

When a student submits an application:

1. Application is received by the backend
2. Student details are stored in MongoDB
3. Sarala receives an email notification
4. Student receives a success response

---

## 🛠️ Technologies Used

### Frontend

- React.js
- Vite
- JavaScript
- HTML5
- CSS3
- React Router DOM

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- CORS
- dotenv

### Services

- MongoDB Atlas — Database
- Cloudinary — Image storage
- Resend — Email notifications

---

## 📁 Project Structure

```text
mehendi-academy-website/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   │   └── images/
│   │   ├── components/
│   │   │   ├── About.jsx
│   │   │   ├── Classes.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Gallery.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Reviews.jsx
│   │   │   ├── Services.jsx
│   │   │   └── StudentKit.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── AdminGallery.jsx
│   │   │   └── Home.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   └── package.json
│
├── server/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── .gitignore
├── package.json
└── README.md