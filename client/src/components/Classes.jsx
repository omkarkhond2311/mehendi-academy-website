function Classes() {
  const topics = [
    "Mehendi Cone Making",
    "Basic Line, Thick, Thin, Scalp",
    "Different Types of Flowers",
    "Arabian & Mandala Pattern Mehendi",
    "Dubai Pattern Mehendi",
    "Elephant, Peacock & Swans",
    "Advance Bridal Start-up",
    "Lotus Cutwork",
    "Minakari Work",
    "Bride & Groom Side 3/4 Face",
    "Single Bride & Groom Setup",
    "Sindur, Varmala Figure Setup",
    "Kanyadan Figure Setup",
    "Engagement Figure",
    "Baby Shower Elements",
    "Baby Shower Figures",
    "Back Hand (2)",
    "Engagement Legs (Mandala Pattern)",
    "Bridal Legs",
    "Hand Model Practice",
    "Legs Model Practice",
    "Social Media Handling",
    "Client Handling",
    "Exam Day",
  ];

  return (
    <section
      id="classes"
      className="py-24 bg-white"
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADING */}
        <div className="text-center mb-14">

          <p className="text-pink-600 font-semibold tracking-widest uppercase text-sm">
            Learn Mehendi Professionally
          </p>

          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900">
            Basic to Professional Mehendi Course
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Learn Mehendi step-by-step from the basics to advanced
            bridal and professional techniques in a structured
            40-day course.
          </p>

        </div>

        {/* COURSE INFO */}
        <div className="grid md:grid-cols-3 gap-5 mb-12">

          <div className="bg-pink-50 rounded-2xl p-6 text-center">
            <div className="text-3xl mb-3">📅</div>
            <h3 className="font-bold text-gray-900 text-lg">
              40 Days
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              Complete Course
            </p>
          </div>

          <div className="bg-rose-50 rounded-2xl p-6 text-center">
            <div className="text-3xl mb-3">💰</div>
            <h3 className="font-bold text-gray-900 text-lg">
              ₹8,000
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              Online & Offline
            </p>
          </div>

          <div className="bg-pink-50 rounded-2xl p-6 text-center">
            <div className="text-3xl mb-3">🎁</div>
            <h3 className="font-bold text-gray-900 text-lg">
              FREE Kit
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              With Every Admission
            </p>
          </div>

        </div>

        {/* ONLINE / OFFLINE */}
        <div className="grid md:grid-cols-2 gap-6 mb-14">

          {/* OFFLINE */}
          <div className="border border-pink-200 rounded-2xl p-7 bg-pink-50">

            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl">
                🎓
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Offline Classes
                </h3>

                <p className="text-gray-500 text-sm">
                  📍 Kopargaon
                </p>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">
              Learn through personal, practical training with
              direct guidance and hands-on practice in Kopargaon.
            </p>

            <div className="mt-5 font-bold text-pink-600">
              ₹8,000 • 40 Days
            </div>

          </div>

          {/* ONLINE */}
          <div className="border border-pink-200 rounded-2xl p-7 bg-rose-50">

            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl">
                💻
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Online Classes
                </h3>

                <p className="text-gray-500 text-sm">
                  💻 Live on Zoom
                </p>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">
              Learn from home through online training conducted
              on Zoom with step-by-step guidance.
            </p>

            <div className="mt-5 font-bold text-pink-600">
              ₹8,000 • 40 Days
            </div>

          </div>

        </div>

        {/* COURSE CURRICULUM */}
        <div className="bg-gray-50 rounded-3xl p-6 md:p-10">

          <div className="text-center mb-10">

            <p className="text-pink-600 font-semibold text-sm uppercase tracking-widest">
              Course Curriculum
            </p>

            <h3 className="mt-2 text-3xl font-bold text-gray-900">
              What You Will Learn
            </h3>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {topics.map((topic, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 flex items-start gap-3 border border-gray-100 hover:border-pink-200 hover:shadow-sm transition"
              >

                <span className="flex-shrink-0 w-7 h-7 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </span>

                <p className="text-gray-700 text-sm leading-relaxed">
                  {topic}
                </p>

              </div>
            ))}

          </div>

        </div>

        {/* FREE KIT + APPLY */}
        <div
          id="apply"
          className="mt-12 bg-pink-600 rounded-3xl p-8 md:p-12 text-center text-white"
        >

          <div className="text-4xl mb-4">
            🎁
          </div>

          <h3 className="text-3xl md:text-4xl font-bold">
            Join the Course & Get a FREE Mehendi Kit
          </h3>

          <p className="mt-4 text-pink-100 max-w-2xl mx-auto">
            Choose Online or Offline learning and start your
            Mehendi journey with Sarala's Mehendi Academy.
            The student kit is free with admission.
          </p>

          <a
            href="#contact"
            className="inline-block mt-7 bg-white text-pink-600 px-7 py-3 rounded-md font-semibold hover:bg-pink-50 transition"
          >
            Apply for Admission
          </a>

        </div>

      </div>
    </section>
  );
}

export default Classes;