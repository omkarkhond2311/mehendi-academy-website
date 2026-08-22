import didiPhoto from "../assets/images/didi.jpeg";

function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 pt-28"
    >
      <div className="max-w-6xl mx-auto px-8 lg:px-12">

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[calc(100vh-7rem)]">

          {/* LEFT SIDE */}
          <div className="text-center lg:text-left max-w-xl">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-4 py-2 rounded-lg text-sm font-semibold mb-6">
              ✨ Professional Mehendi Artist & Trainer
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1]">
              Beautiful Art.
              <span className="block text-pink-600 mt-2">
                Beautiful Moments.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 text-gray-600 text-base lg:text-lg leading-relaxed max-w-lg">
              Professional Mehendi services, beautiful designs, and
              expert training through online and offline classes.
            </p>

            {/* BUTTONS */}
            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3">

              <a
                href="#apply"
                className="bg-pink-600 text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-md hover:bg-pink-700 transition"
              >
                Apply for Classes
              </a>

              <a
                href="#gallery"
                className="border border-pink-600 text-pink-600 px-6 py-3 rounded-lg text-sm font-semibold hover:bg-pink-50 transition"
              >
                Explore Our Work
              </a>

            </div>

            {/* TRUST POINTS */}
            <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-x-7 gap-y-5">

              <div>
                <p className="font-semibold text-gray-900 text-sm">
                  ✨ Professional
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Mehendi Services
                </p>
              </div>

              <div className="hidden sm:block w-px h-10 bg-gray-300"></div>

              <div>
                <p className="font-semibold text-gray-900 text-sm">
                  🎓 Online & Offline
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Mehendi Classes
                </p>
              </div>

              <div className="hidden sm:block w-px h-10 bg-gray-300"></div>

              <div>
                <p className="font-semibold text-gray-900 text-sm">
                  🎁 Student Kits
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Included with Classes
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT SIDE - PHOTO */}
          <div className="flex justify-center lg:justify-end">

            <div className="relative">

              {/* Pink decorative frame */}
              <div className="absolute -inset-4 bg-pink-200/70 rounded-[3rem] rotate-3"></div>

              <div className="absolute -inset-2 border-2 border-pink-300 rounded-[3rem] -rotate-2"></div>

              {/* Photo */}
              <img
                src={didiPhoto}
                alt="Mehendi Artist and Trainer"
                className="relative w-[280px] sm:w-[330px] lg:w-[370px] h-[430px] sm:h-[500px] lg:h-[540px] object-cover object-top rounded-[3rem] shadow-2xl"
              />

              {/* Badge */}
              <div className="absolute bottom-6 -left-5 bg-white px-4 py-3 rounded-xl shadow-lg">
                <p className="font-bold text-gray-900 text-sm">
                  ✨ Artist & Trainer
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Online & Offline Classes
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;