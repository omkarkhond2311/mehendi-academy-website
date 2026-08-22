function About() {
  return (
    <section
      id="about"
      className="py-24 bg-white"
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">

          <p className="text-pink-600 font-semibold tracking-widest uppercase text-sm">
            About The Artist
          </p>

          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900">
            Meet Sarala Khond
          </h2>

          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            The artist and trainer behind Sarala's Mehendi Academy.
          </p>

        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Story */}
          <div>

            <h3 className="text-2xl font-bold text-gray-900 mb-5">
              Turning Mehendi Into an Art & Skill
            </h3>

            <p className="text-gray-600 leading-relaxed mb-5">
              Sarala Khond is a professional Mehendi artist and trainer
              with 3 years of experience in the art of Mehendi.
            </p>

            <p className="text-gray-600 leading-relaxed mb-5">
              Through Sarala's Mehendi Academy, she helps students learn
              Mehendi with practical guidance, creative techniques and
              hands-on training.
            </p>

            <p className="text-gray-600 leading-relaxed">
              She conducts classes both offline in Kopargaon and online
              through Zoom, making it possible for students to learn
              from wherever they are.
            </p>

          </div>

          {/* Academy Highlights */}
          <div className="grid grid-cols-2 gap-5">

            <div className="bg-pink-50 rounded-2xl p-6">
              <div className="text-3xl mb-3">🎨</div>

              <h4 className="text-xl font-bold text-gray-900">
                3 Years
              </h4>

              <p className="text-gray-500 text-sm mt-1">
                Mehendi Experience
              </p>
            </div>

            <div className="bg-rose-50 rounded-2xl p-6">
              <div className="text-3xl mb-3">🎓</div>

              <h4 className="text-xl font-bold text-gray-900">
                40+
              </h4>

              <p className="text-gray-500 text-sm mt-1">
                Students Trained
              </p>
            </div>

            <div className="bg-pink-50 rounded-2xl p-6">
              <div className="text-3xl mb-3">📍</div>

              <h4 className="text-xl font-bold text-gray-900">
                Kopargaon
              </h4>

              <p className="text-gray-500 text-sm mt-1">
                Offline Classes
              </p>
            </div>

            <div className="bg-rose-50 rounded-2xl p-6">
              <div className="text-3xl mb-3">💻</div>

              <h4 className="text-xl font-bold text-gray-900">
                Zoom
              </h4>

              <p className="text-gray-500 text-sm mt-1">
                Online Classes
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default About;