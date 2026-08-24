import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    mode: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form submitted!");
    console.log("Sending:", formData);

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://sarala-mehendi-api.onrender.com/api/applications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      console.log("Server response:", data);

      if (response.ok && data.success) {
        alert(
          "Application submitted successfully! Sarala will contact you soon."
        );

        setFormData({
          name: "",
          phone: "",
          mode: "",
          message: "",
        });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);

      alert(
        "Unable to connect to the server. Please make sure the server is running."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-pink-600 font-semibold tracking-widest uppercase text-sm">
            Start Your Mehendi Journey
          </p>

          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900">
            Apply for a Class
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Fill in your details and Sarala will contact you regarding
            your admission.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-10">

          {/* Course Information */}
          <div className="bg-pink-50 rounded-3xl p-8">

            <h3 className="text-2xl font-bold text-gray-900">
              Basic to Professional Mehendi Course
            </h3>

            <p className="mt-4 text-gray-600 leading-relaxed">
              Learn Mehendi step-by-step through our 40-day course
              and develop your skills from basic techniques to
              professional bridal designs.
            </p>

            <div className="mt-8 space-y-5">

              {/* Duration */}
              <div className="flex items-center gap-4">
                <span className="text-2xl">📅</span>

                <div>
                  <p className="font-semibold text-gray-900">
                    Duration
                  </p>

                  <p className="text-gray-500 text-sm">
                    40 Days
                  </p>
                </div>
              </div>

              {/* Fee */}
              <div className="flex items-center gap-4">
                <span className="text-2xl">💰</span>

                <div>
                  <p className="font-semibold text-gray-900">
                    Course Fee
                  </p>

                  <p className="text-gray-500 text-sm">
                    ₹8,000 — Online & Offline
                  </p>
                </div>
              </div>

              {/* Offline */}
              <div className="flex items-center gap-4">
                <span className="text-2xl">📍</span>

                <div>
                  <p className="font-semibold text-gray-900">
                    Offline Classes
                  </p>

                  <p className="text-gray-500 text-sm">
                    Kopargaon
                  </p>
                </div>
              </div>

              {/* Online */}
              <div className="flex items-center gap-4">
                <span className="text-2xl">💻</span>

                <div>
                  <p className="font-semibold text-gray-900">
                    Online Classes
                  </p>

                  <p className="text-gray-500 text-sm">
                    Live on Zoom
                  </p>
                </div>
              </div>

            </div>

            {/* Free Kit */}
            <div className="mt-8 bg-white border-2 border-pink-200 rounded-2xl p-5">

              <div className="flex gap-4 items-start">

                <span className="text-3xl">
                  🎁
                </span>

                <div>
                  <h4 className="font-bold text-gray-900">
                    FREE Mehendi Kit
                  </h4>

                  <p className="text-gray-600 text-sm mt-1">
                    Every student receives a Mehendi kit
                    completely free with admission.
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* Application Form */}
          <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">

            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Admission Form
            </h3>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-pink-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mobile Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your mobile number"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-pink-500"
                />
              </div>

              {/* Mode */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Choose Class Mode
                </label>

                <div className="grid grid-cols-2 gap-3">

                  {/* Offline */}
                  <label className="border border-gray-300 rounded-lg p-4 cursor-pointer hover:border-pink-500">

                    <input
                      type="radio"
                      name="mode"
                      value="Offline"
                      checked={formData.mode === "Offline"}
                      onChange={handleChange}
                      required
                      className="mr-2"
                    />

                    🎓 Offline

                  </label>

                  {/* Online */}
                  <label className="border border-gray-300 rounded-lg p-4 cursor-pointer hover:border-pink-500">

                    <input
                      type="radio"
                      name="mode"
                      value="Online"
                      checked={formData.mode === "Online"}
                      onChange={handleChange}
                      required
                      className="mr-2"
                    />

                    💻 Online

                  </label>

                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message / Requirement
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us anything you would like to know..."
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-pink-500 resize-none"
                ></textarea>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition disabled:opacity-60"
              >
                {isSubmitting
                  ? "Submitting..."
                  : "Submit Application"}
              </button>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Contact;