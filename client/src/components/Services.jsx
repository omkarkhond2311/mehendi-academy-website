function Services() {
  const services = [
    {
      icon: "🌸",
      title: "Mehendi Orders",
      description:
        "Beautiful Mehendi designs for weddings, celebrations, festivals and special occasions.",
      button: "Enquire Now",
      link: "#contact",
    },
    {
      icon: "🎓",
      title: "Offline Classes",
      description:
        "Learn Mehendi personally with practical guidance and hands-on training in Kopargaon.",
      button: "Apply Now",
      link: "#apply",
    },
    {
      icon: "💻",
      title: "Online Classes",
      description:
        "Learn from home through live online Mehendi classes conducted on Zoom.",
      button: "Apply Now",
      link: "#apply",
    },
    {
      icon: "🎁",
      title: "FREE Student Kit",
      description:
        "Every student who enrolls in an online or offline class receives a Mehendi kit completely free with admission.",
      button: "View Classes",
      link: "#classes",
    },
  ];

  return (
    <section
      id="services"
      className="py-24 bg-pink-50"
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* SECTION HEADING */}
        <div className="text-center mb-14">

          <p className="text-pink-600 font-semibold tracking-widest uppercase text-sm">
            What We Offer
          </p>

          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900">
            Our Services
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Whether you want beautiful Mehendi for your special occasion
            or want to learn the art yourself, Sarala's Mehendi Academy
            is here for you.
          </p>

        </div>

        {/* SERVICE CARDS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-7 shadow-sm border border-pink-100 hover:-translate-y-2 hover:shadow-xl transition duration-300"
            >

              {/* ICON */}
              <div className="w-14 h-14 flex items-center justify-center bg-pink-100 rounded-xl text-3xl mb-6">
                {service.icon}
              </div>

              {/* TITLE */}
              <h3 className="text-xl font-bold text-gray-900">
                {service.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                {service.description}
              </p>

              {/* BUTTON */}
              <a
                href={service.link}
                className="inline-block mt-6 text-pink-600 font-semibold text-sm hover:text-pink-800 transition"
              >
                {service.button} →
              </a>

            </div>
          ))}

        </div>

        {/* FREE KIT HIGHLIGHT */}
        <div className="mt-12 bg-white border-2 border-pink-200 rounded-2xl p-6 md:p-8 text-center shadow-sm">

          <div className="text-4xl mb-3">
            🎁
          </div>

          <h3 className="text-2xl font-bold text-gray-900">
            FREE Mehendi Kit With Every Admission
          </h3>

          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Enroll in either our online or offline Mehendi classes
            and receive a specially prepared Mehendi kit completely
            free with your admission.
          </p>

          <a
            href="#apply"
            className="inline-block mt-6 bg-pink-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-pink-700 transition"
          >
            Apply for a Class
          </a>

        </div>

      </div>
    </section>
  );
}

export default Services;