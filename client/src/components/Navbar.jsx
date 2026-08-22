function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <a href="#home" className="leading-tight">
          <h1 className="text-2xl font-bold text-pink-600">
            Sarala's
          </h1>

          <p className="text-sm text-gray-500 font-medium tracking-wide">
            MEHENDI ACADEMY
          </p>
        </a>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8">

          <a
            href="#home"
            className="text-gray-700 hover:text-pink-600 transition"
          >
            Home
          </a>

          <a
            href="#about"
            className="text-gray-700 hover:text-pink-600 transition"
          >
            About
          </a>

          <a
            href="#services"
            className="text-gray-700 hover:text-pink-600 transition"
          >
            Services
          </a>

          <a
            href="#classes"
            className="text-gray-700 hover:text-pink-600 transition"
          >
            Classes
          </a>

          <a
            href="#gallery"
            className="text-gray-700 hover:text-pink-600 transition"
          >
            Gallery
          </a>

          <a
            href="#contact"
            className="text-gray-700 hover:text-pink-600 transition"
          >
            Contact
          </a>

        </div>

        {/* Apply button */}
        <a
          href="#apply"
          className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition"
        >
          Apply Now
        </a>

      </div>
    </nav>
  );
}

export default Navbar;