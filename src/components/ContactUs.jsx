import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ContactUs = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        description: "",
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: "+1 (555) 123-4567",
      subtitle: "Mon-Fri from 8am to 6pm",
    },
    {
      icon: Mail,
      title: "Email",
      details: "support@kthsports.com",
      subtitle: "We reply within 24 hours",
    },
    {
      icon: MapPin,
      title: "Store",
      details: "123 Sports Avenue",
      subtitle: "New York, NY 10001",
    },
    {
      icon: Clock,
      title: "Hours",
      details: "Monday - Sunday",
      subtitle: "8:00 AM - 10:00 PM",
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: theme.bgPrimary, color: theme.textPrimary }}
    >
      {/* Hero Section */}
      <div
        className="relative py-10 px-4"
        style={{
          background: `linear-gradient(to bottom, ${theme.bgSecondary}, ${theme.bgPrimary})`,
        }}
      >
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Contact <span style={{ color: theme.accent }}>KTH Sports</span>
          </h1>
          <p
            className="text-xl max-w-3xl mx-auto"
            style={{ color: theme.textSecondary }}
          >
            Get in touch with us. We're here to help with any questions about
            our products and services.
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Side - Contact Information */}
          <div className="lg:w-2/5">
            <h2
              className="text-3xl font-bold mb-6"
              style={{ color: theme.accent }}
            >
              Get In Touch
            </h2>
            <p className="text-lg mb-8" style={{ color: theme.textSecondary }}>
              Have questions about our products? Our team is here to help you
              find the perfect sports gear for your needs.
            </p>

            {/* Contact Information Cards */}
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start p-4 rounded-lg transition-all duration-300 hover:scale-105"
                  style={{ backgroundColor: theme.bgSecondary }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0"
                    style={{ backgroundColor: `${theme.accent}20` }}
                  >
                    <item.icon
                      className="h-6 w-6"
                      style={{ color: theme.accent }}
                    />
                  </div>
                  <div>
                    <h3
                      className="text-lg font-semibold mb-1"
                      style={{ color: theme.textPrimary }}
                    >
                      {item.title}
                    </h3>
                    <p className="font-medium" style={{ color: theme.accent }}>
                      {item.details}
                    </p>
                    <p
                      className="text-sm mt-1"
                      style={{ color: theme.textSecondary }}
                    >
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Section */}
            <div className="mt-8 rounded-lg overflow-hidden shadow-lg">
              <div className="h-64 w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1313.233535645545!2d85.84433851929735!3d20.289969208827426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19a14fd5712c61%3A0x9b02a71f624c28dd!2sDaya%20Consultancy%20Services%20(OPC)%20Pvt.%20Ltd.!5e1!3m2!1sen!2sin!4v1758713767233!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Map Location"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="lg:w-3/5">
            <div
              className="p-6 md:p-8 rounded-lg shadow-lg"
              style={{ backgroundColor: theme.bgSecondary }}
            >
              <h2
                className="text-2xl font-bold mb-2"
                style={{ color: theme.accent }}
              >
                Send us a Message
              </h2>
              <p className="mb-6" style={{ color: theme.textSecondary }}>
                Fill out the form below and we'll get back to you as soon as
                possible.
              </p>

              {isSubmitted ? (
                <div
                  className="p-6 rounded-lg text-center"
                  style={{ backgroundColor: `${theme.accent}10` }}
                >
                  <CheckCircle
                    className="h-12 w-12 mx-auto mb-4"
                    style={{ color: theme.accent }}
                  />
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ color: theme.textPrimary }}
                  >
                    Message Sent Successfully!
                  </h3>
                  <p style={{ color: theme.textSecondary }}>
                    Thank you for contacting us. We'll get back to you within 24
                    hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2"
                        style={{ color: theme.textPrimary }}
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 transition-colors"
                        style={{
                          backgroundColor: theme.bgPrimary,
                          borderColor: theme.border,
                          color: theme.textPrimary,
                          focusBorderColor: theme.accent,
                          focusRingColor: theme.accent,
                        }}
                        placeholder="Enter your full name"
                      />
                    </div>

                    {/* Email Field */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2"
                        style={{ color: theme.textPrimary }}
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 transition-colors"
                        style={{
                          backgroundColor: theme.bgPrimary,
                          borderColor: theme.border,
                          color: theme.textPrimary,
                          focusBorderColor: theme.accent,
                          focusRingColor: theme.accent,
                        }}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Phone Field */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium mb-2"
                        style={{ color: theme.textPrimary }}
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 transition-colors"
                        style={{
                          backgroundColor: theme.bgPrimary,
                          borderColor: theme.border,
                          color: theme.textPrimary,
                          focusBorderColor: theme.accent,
                          focusRingColor: theme.accent,
                        }}
                        placeholder="Enter your phone number"
                      />
                    </div>

                    {/* Subject Field */}
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium mb-2"
                        style={{ color: theme.textPrimary }}
                      >
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 transition-colors"
                        style={{
                          backgroundColor: theme.bgPrimary,
                          borderColor: theme.border,
                          color: theme.textPrimary,
                          focusBorderColor: theme.accent,
                          focusRingColor: theme.accent,
                        }}
                        placeholder="Enter subject"
                      />
                    </div>
                  </div>

                  {/* Description Field */}
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium mb-2"
                      style={{ color: theme.textPrimary }}
                    >
                      Message *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      required
                      rows={6}
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 transition-colors resize-vertical"
                      style={{
                        backgroundColor: theme.bgPrimary,
                        borderColor: theme.border,
                        color: theme.textPrimary,
                        focusBorderColor: theme.accent,
                        focusRingColor: theme.accent,
                      }}
                      placeholder="Tell us about your inquiry..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 rounded-md font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: theme.accent,
                      color: theme.textPrimary,
                    }}
                    onMouseOver={(e) => {
                      if (!isSubmitting) {
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow = `0 4px 12px ${theme.accent}40`;
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!isSubmitting) {
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "none";
                      }
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Additional Info */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className="p-6 rounded-lg text-center"
                style={{ backgroundColor: theme.bgSecondary }}
              >
                <h3
                  className="font-semibold mb-2"
                  style={{ color: theme.textPrimary }}
                >
                  Response Time
                </h3>
                <p className="text-sm" style={{ color: theme.textSecondary }}>
                  We typically respond to all inquiries within 24 hours during
                  business days.
                </p>
              </div>
              <div
                className="p-6 rounded-lg text-center"
                style={{ backgroundColor: theme.bgSecondary }}
              >
                <h3
                  className="font-semibold mb-2"
                  style={{ color: theme.textPrimary }}
                >
                  Support Hours
                </h3>
                <p className="text-sm" style={{ color: theme.textSecondary }}>
                  Monday - Sunday: 8:00 AM - 10:00 PM EST
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div
        className="py-16 mt-16 border-t"
        style={{ borderColor: theme.border }}
      >
        <div className="container mx-auto px-4">
          <h2
            className="text-3xl font-bold text-center mb-12"
            style={{ color: theme.accent }}
          >
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "What is your return policy?",
                answer:
                  "We offer 30-day returns on all unused items with original tags attached.",
              },
              {
                question: "Do you offer international shipping?",
                answer:
                  "Yes, we ship worldwide. Shipping costs and delivery times vary by location.",
              },
              {
                question: "How can I track my order?",
                answer:
                  "You'll receive a tracking number via email once your order ships.",
              },
              {
                question: "Do you have a physical store?",
                answer:
                  "Yes, visit us at 123 Sports Avenue, New York, NY 10001.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="p-6 rounded-lg"
                style={{ backgroundColor: theme.bgSecondary }}
              >
                <h3
                  className="font-semibold mb-3"
                  style={{ color: theme.textPrimary }}
                >
                  {faq.question}
                </h3>
                <p className="text-sm" style={{ color: theme.textSecondary }}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
