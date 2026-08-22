import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminGallery from "./pages/AdminGallery";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/admin" element={<AdminLogin />} />

        <Route path="/admin/gallery" element={<AdminGallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;