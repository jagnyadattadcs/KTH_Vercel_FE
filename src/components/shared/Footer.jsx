import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white py-8 md:py-12 shadow-xl relative backdrop-blur-lg border-t border-gray-300 selection:bg-[#ff8c00]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-10">
          {/* Contact Info */}
          <div className="lg:w-2/5">
            <h2 className="text-lg md:text-xl font-bold mb-4">
              KTH SPORTS, BHUBANESWAR
            </h2>
            <p className="text-sm md:text-base">K-8, KALINGA NAGAR, GHATIKIA, BHUBANESWAR, 751003, ODISHA</p>
            <p className="mt-2 text-sm md:text-base">📞 PHONE: +91 06743500500</p>
            <p className="text-sm md:text-base">✉️ contact@kthsports.com</p>

            {/* Social Icons */}
            <div className="flex space-x-3 md:space-x-4 mt-4">
              {[FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, FaInstagram].map(
                (Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="p-2 md:p-3 rounded-full border border-black hover:text-[#ff8c00] hover:font-bold hover:border-[#ff8c00] transition-all text-sm md:text-base"
                  >
                    <Icon />
                  </a>
                )
              )}
            </div>
            
            {/* Map Section */}
            <div className="mt-4 md:mt-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d393.35578621818223!2d85.84544330695992!3d20.289833914279985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19a14fd5712c61%3A0x9b02a71f624c28dd!2sDaya%20Consultancy%20Services%20(OPC)%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1757051786580!5m2!1sen!2sin"
                className="w-full h-48 md:h-64 lg:h-72"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="KTH Sports Location"
              />
            </div>
          </div>

          {/* Quick Links & Corporate & Departments */}
          <div className="lg:w-3/5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Quick Links */}
            <div>
              <h2 className="text-lg md:text-xl font-bold mb-4">QUICK LINKS</h2>
              <ul className="space-y-2">
                {[
                  "About Us",
                  "Our Doctors",
                  "Our Facilities",
                  "Our Patients Speak",
                  "Sitemap",
                  "Contact Us",
                  "Biomedical Waste",
                  "Blog",
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="hover:text-[#ff8c00] hover:font-bold transition-colors cursor-pointer text-sm md:text-base"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Corporate */}
            <div>
              <h2 className="text-lg md:text-xl font-bold mb-4">CORPORATE</h2>
              <ul className="space-y-2">
                {["The Leadership", "Awards & Accolades", "Our Story"].map(
                  (item, idx) => (
                    <li
                      key={idx}
                      className="hover:text-[#ff8c00] hover:font-bold transition-colors cursor-pointer text-sm md:text-base"
                    >
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Departments */}
            <div>
              <h2 className="text-lg md:text-xl font-bold mb-4">OUR DEPARTMENTS</h2>
              <ul className="space-y-2">
                {[
                  "General Medicine",
                  "Orthopedics",
                  "Obstetrics & Gynecology",
                  "Nephrology",
                  "Paediatrics",
                  "Cosmetic Surgery",
                  "Urology",
                  "Cardiology",
                  "Dentistry",
                  "Oncology",
                  "ENT",
                  "Rheumatology",
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="hover:text-[#ff8c00] hover:font-bold transition-colors cursor-pointer text-sm md:text-base"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-8 md:mt-10 text-center text-xs md:text-sm border-t border-gray-300 pt-4">
          © {new Date().getFullYear()} RKH Sports. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;