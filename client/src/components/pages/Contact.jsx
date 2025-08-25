// import React, { useState } from "react";

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     subject: "",
//     message: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [shakeErrors, setShakeErrors] = useState(false);

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.name.trim()) {
//       newErrors.name = "Name is required";
//     }
//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = "Please enter a valid email";
//     }
//     if (!formData.phone.trim()) {
//       newErrors.phone = "Phone number is required";
//     } else if (!/^\+?\d{10,15}$/.test(formData.phone.trim())) {
//       newErrors.phone = "Please enter a valid phone number";
//     }
//     if (!formData.subject.trim()) {
//       newErrors.subject = "Please select a subject";
//     }
//     if (!formData.message.trim()) {
//       newErrors.message = "Message is required";
//     } else if (formData.message.trim().length < 10) {
//       newErrors.message = "Message should be at least 10 characters";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     if (errors[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validate()) {
//       setIsSubmitting(true);
//       try {
//         const res = await fetch("http://localhost:4000/contact", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(formData),
//         });
//         if (res.ok) {
//           setIsSubmitting(false);
//           setIsSuccess(true);
//           setTimeout(() => {
//             setFormData({
//               name: "",
//               email: "",
//               phone: "",
//               subject: "",
//               message: "",
//             });
//             setIsSuccess(false);
//           }, 3000);
//         } else {
//           setIsSubmitting(false);
//           alert("Failed to send message.");
//         }
//       } catch (err) {
//         setIsSubmitting(false);
//         alert("Server error. Try again later.");
//       }
//     } else {
//       setShakeErrors(true);
//       setTimeout(() => setShakeErrors(false), 400);
//     }
//   };

//   const handleReset = () => {
//     setFormData({
//       name: "",
//       email: "",
//       phone: "",
//       subject: "",
//       message: "",
//     });
//     setErrors({});
//   };

//   return (
//     <div className="container py-5">
//       <div className="row justify-content-center">
//         <div className="col-lg-8">
//           <div className="card shadow-lg border-0 rounded-4">
//             <div className="row g-0">
//               {/* Image Section */}
//               <div className="col-md-5 d-none d-md-block">
//                 <img
//                   src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/94a17380-7088-4f48-aa0b-f52877304f11.png"
//                   alt="Customer support team"
//                   className="img-fluid h-100 rounded-start"
//                   style={{ objectFit: "cover", minHeight: "100%" }}
//                 />
//               </div>
//               {/* Form Section */}
//               <div className="col-12 col-md-7 p-4">
//                 <h2 className="text-primary fw-bold mb-1 text-center">Contact Us</h2>
//                 <p className="text-muted mb-4 text-center">We'd love to hear from you</p>

//                 {isSuccess ? (
//                   <div className="alert alert-success text-center">
//                     <svg
//                       className="mb-2"
//                       width="48"
//                       height="48"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       style={{ color: "#198754" }}
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M5 13l4 4L19 7"
//                       ></path>
//                     </svg>
//                     <div>Message Sent! We'll get back to you soon.</div>
//                   </div>
//                 ) : (
//                   <form onSubmit={handleSubmit} aria-label="Contact form">
//                     <div className="mb-3">
//                       <label htmlFor="name" className="form-label fw-semibold text-primary">
//                         Full Name
//                       </label>
//                       <input
//                         type="text"
//                         id="name"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         className={`form-control ${errors.name ? "is-invalid" : ""}`}
//                         placeholder="Name"
//                         aria-required="true"
//                       />
//                       {errors.name && (
//                         <div className={`invalid-feedback d-block ${shakeErrors ? "animate-shake" : ""}`}>
//                           {errors.name}
//                         </div>
//                       )}
//                     </div>

//                     <div className="mb-3">
//                       <label htmlFor="email" className="form-label fw-semibold text-primary">
//                         Email Address
//                       </label>
//                       <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         className={`form-control ${errors.email ? "is-invalid" : ""}`}
//                         placeholder="Email"
//                         aria-required="true"
//                       />
//                       {errors.email && (
//                         <div className={`invalid-feedback d-block ${shakeErrors ? "animate-shake" : ""}`}>
//                           {errors.email}
//                         </div>
//                       )}
//                     </div>

//                     <div className="mb-3">
//                       <label htmlFor="phone" className="form-label fw-semibold text-primary">
//                         Phone Number
//                       </label>
//                       <input
//                         type="tel"
//                         id="phone"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         className={`form-control ${errors.phone ? "is-invalid" : ""}`}
//                         placeholder="+19"
//                         aria-required="true"
//                       />
//                       {errors.phone && (
//                         <div className={`invalid-feedback d-block ${shakeErrors ? "animate-shake" : ""}`}>
//                           {errors.phone}
//                         </div>
//                       )}
//                     </div>

//                     <div className="mb-3">
//                       <label htmlFor="subject" className="form-label fw-semibold text-primary">
//                         Subject
//                       </label>
//                       <select
//                         id="subject"
//                         name="subject"
//                         value={formData.subject}
//                         onChange={handleChange}
//                         className={`form-select ${errors.subject ? "is-invalid" : ""}`}
//                         aria-required="true"
//                       >
//                         <option value="">Select a subject</option>
//                         <option value="General Inquiry">General Inquiry</option>
//                         <option value="Support">Support</option>
//                         <option value="Feedback">Feedback</option>
//                       </select>
//                       {errors.subject && (
//                         <div className={`invalid-feedback d-block ${shakeErrors ? "animate-shake" : ""}`}>
//                           {errors.subject}
//                         </div>
//                       )}
//                     </div>

//                     <div className="mb-3">
//                       <label htmlFor="message" className="form-label fw-semibold text-primary">
//                         Your Message
//                       </label>
//                       <textarea
//                         id="message"
//                         name="message"
//                         rows="4"
//                         value={formData.message}
//                         onChange={handleChange}
//                         className={`form-control ${errors.message ? "is-invalid" : ""}`}
//                         placeholder="How can we help you?"
//                         aria-required="true"
//                         maxLength={500}
//                       ></textarea>
//                       <div className="text-end text-muted" style={{ fontSize: "0.9rem" }}>
//                         {formData.message.length}/500 characters
//                       </div>
//                       {errors.message && (
//                         <div className={`invalid-feedback d-block ${shakeErrors ? "animate-shake" : ""}`}>
//                           {errors.message}
//                         </div>
//                       )}
//                     </div>

//                     <div className="d-flex gap-2">
//                       <button
//                         type="submit"
//                         disabled={isSubmitting}
//                         className="btn btn-primary mt-2 flex-grow-1"
//                       >
//                         {isSubmitting ? (
//                           <>
//                             <span
//                               className="spinner-border spinner-border-sm me-2"
//                               role="status"
//                               aria-hidden="true"
//                             ></span>
//                             Sending...
//                           </>
//                         ) : (
//                           "Send Message"
//                         )}
//                       </button>
//                       <button
//                         type="button"
//                         className="btn btn-secondary mt-2"
//                         onClick={handleReset}
//                       >
//                         Reset
//                       </button>
//                     </div>
//                   </form>
//                 )}

//                 <div className="mt-4 text-center">
//                   <p className="text-muted">
//                     Or reach us directly at{" "}
//                     <a
//                       href="mailto:hello@example.com"
//                       className="text-primary fw-semibold"
//                     >
//                       hello@example.com
//                     </a>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;




import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Replace with your backend POST endpoint if needed
    try {
      const res = await fetch("http://localhost:4000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsSuccess(true);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setTimeout(() => setIsSuccess(false), 3000);
      } else {
        setIsSuccess(false);
        alert("Failed to send message.");
      }
    } catch {
      setIsSuccess(false);
      alert("Server error. Try again later.");
    }
    setIsSubmitting(false);
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="contact-hero text-center">
        <div className="container">
          <h1 className="display-4 fw-bold mb-3">Contact Us</h1>
          <p className="lead">
            We'd love to hear from you. Get in touch with our team for any questions or inquiries.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container">
        <div className="row">
          {/* Contact Form */}
          <div className="col-lg-8 mb-5 mb-lg-0">
            <div className="contact-card card p-4 p-md-5 shadow-sm">
              <h2 className="mb-4">Send Us a Message</h2>
              {isSuccess && (
                <div className="alert alert-success" role="alert">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <label htmlFor="name" className="form-label">Your Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary submit-btn text-white"
  disabled={isSubmitting}
>
                  <i className="fas fa-paper-plane me-2"></i>
  {isSubmitting ? "Sending..." : "Send Message"}

                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="col-lg-4">
            <div className="contact-card card p-4 mb-4 shadow-sm">
              <div className="text-center">
                <i className="fas fa-map-marker-alt contact-icon"></i>
                <h3>Our Location</h3>
                <div className="mb-2">
                  <iframe
                    title="Company Location"
                    src="https://www.google.com/maps?q=Kashmir+Srinagar+India&output=embed"
                    width="100%"
                    height="200"
                    style={{ border: 0, borderRadius: "8px" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <p className="mt-2">
                  Kashmir Srinagar, India
                </p>
              </div>
            </div>


            <div className="contact-card card p-4 mb-4 shadow-sm">
              <div className="text-center">
                <i className="fas fa-envelope contact-icon"></i>
                <h3>Email Us</h3>
                <p>
                  <a href="mailto:info@yourcompany.com" className="text-decoration-none">
                    info@yourcompany.com
                  </a>
                  <br />
                  <a href="mailto:support@yourcompany.com" className="text-decoration-none">
                    support@yourcompany.com
                  </a>
                </p>
              </div>
            </div>
            

            <div className="contact-card card p-4 shadow-sm">
              <div className="text-center">
                <i className="fas fa-phone-alt contact-icon"></i>
                <h3>Call Us</h3>
                <p>
                  Main: <a href="tel:+18005551234" className="text-decoration-none">+1 (800) 555-1234</a>
                  <br />
                  Support: <a href="tel:+199682645127" className="text-decoration-none">+19 9682645127</a>
                  <br />
                  <a
                    href="https://wa.me/9682645127"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none ms-2"
                  >
                    <i className="fab fa-whatsapp me-1" style={{ color: "#25D366" }}></i>
                    WhatsApp
                  </a>
                </p>
                <div className="mt-4">
                  <h5>Follow Us</h5>
                  <div className="d-flex justify-content-center">
                    <a href="#" className="social-icon facebook"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" className="social-icon twitter"><i className="fab fa-twitter"></i></a>
                    <a href="#" className="social-icon instagram"><i className="fab fa-instagram"></i></a>
                    <a href="#" className="social-icon linkedin"><i className="fab fa-linkedin-in"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="map-container">
              <img
                src="https://placehold.co/1920x500"
                alt="Interactive map showing company location at 123 Business Center, San Francisco with map markers"
                style={{ width: "100%", minHeight: "300px", border: "none" }}
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Contact;