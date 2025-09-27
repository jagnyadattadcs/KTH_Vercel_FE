import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import { useState } from "react";

export function SportsFooter() {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null); // null, 'success', 'error'

  const footerSections = [
    {
      title: "Shop",
      links: [
        { title: "Men's Collection", link: "/collections/men" },
        { title: "Women's Collection", link: "/collections/women" },
        { title: "Kids' Collection", link: "/collections/kids" },
        { title: "New Arrivals", link: "/collections/new" },
        { title: "Sale Items", link: "/collections/sale" },
      ],
    },
    {
      title: "Support",
      links: [
        { title: "Size Guide", link: "/support/size-guide" },
        { title: "Shipping Info", link: "/support/shipping" },
        { title: "Returns", link: "/support/returns" },
        { title: "FAQ", link: "/support/faq" },
        { title: "Contact Us", link: "/support/contact" },
      ],
    },
    {
      title: "Company",
      links: [
        { title: "About Us", link: "/company/about" },
        { title: "Careers", link: "/company/careers" },
        { title: "Press", link: "/company/press" },
        { title: "Sustainability", link: "/company/sustainability" },
        { title: "Partnerships", link: "/company/partnerships" },
      ],
    },
  ];

  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle subscription
  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    // Validate email
    if (!email.trim()) {
      setSubscriptionStatus('error');
      return;
    }

    if (!isValidEmail(email)) {
      setSubscriptionStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubscriptionStatus(null);

    try {
      // Replace with your actual backend API endpoint
      const response = await fetch('http://localhost:8080/api/subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (response.ok) {
        setSubscriptionStatus('success');
        setEmail(''); // Clear input on success
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubscriptionStatus(null);
        }, 5000);
      } else {
        throw new Error('Subscription failed');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setSubscriptionStatus('error');
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setSubscriptionStatus(null);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer
      className="bg-card border-t selection:bg-[#ff8c00]/80 selection:text-white"
      style={{ backgroundColor: theme.bgPrimary, borderColor: theme.border }}
    >
      <div className="container mx-auto px-4 py-12">
        {/* Newsletter Section */}
        <div className="rounded-lg p-8 mb-12 text-center">
          <h3
            className="text-2xl font-bold mb-2"
            style={{ color: theme.accent }}
          >
            Stay in the Game
          </h3>
          <p
            className="mb-6 max-w-md mx-auto"
            style={{ color: theme.textSecondary }}
          >
            Get the latest updates on new products, exclusive offers, and
            athletic inspiration.
          </p>
          
          {/* Subscription Form */}
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full outline-none border-1 p-2 rounded-sm"
                  style={{
                    borderColor: subscriptionStatus === 'error' ? '#ef4444' : theme.textSecondary,
                    color: theme.textSecondary,
                    backgroundColor: theme.bgPrimary,
                  }}
                  disabled={isSubmitting}
                />
                {subscriptionStatus === 'error' && (
                  <div 
                    className="absolute top-full left-0 mt-1 text-xs p-1 rounded"
                    style={{ 
                      backgroundColor: '#fef2f2', 
                      color: '#dc2626',
                      border: '1px solid #fecaca'
                    }}
                  >
                    Please enter a valid email address
                  </div>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer px-6 py-2 rounded-md transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: theme.bgSecondary,
                  color: theme.textSecondary,
                  minWidth: '120px'
                }}
                onMouseOver={(e) => {
                  if (!isSubmitting) {
                    e.target.style.backgroundColor = theme.accent;
                    e.target.style.color = theme.textPrimary;
                  }
                }}
                onMouseOut={(e) => {
                  if (!isSubmitting) {
                    e.target.style.backgroundColor = theme.bgSecondary;
                    e.target.style.color = theme.textSecondary;
                  }
                }}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                    Subscribing...
                  </>
                ) : (
                  'Subscribe'
                )}
              </button>
            </div>
            
            {/* Success Message */}
            {subscriptionStatus === 'success' && (
              <div 
                className="mt-3 p-2 rounded text-sm"
                style={{ 
                  backgroundColor: '#f0fdf4', 
                  color: '#166534',
                  border: '1px solid #bbf7d0'
                }}
              >
                ✅ Thank you for subscribing! Check your email for confirmation.
              </div>
            )}
          </form>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span
                className="text-xl font-bold"
                style={{ color: theme.accent }}
              >
                KTH Sports
              </span>
            </div>
            <p className="mb-6 max-w-sm" style={{ color: theme.textSecondary }}>
              Empowering athletes worldwide with premium sportswear and
              equipment. Your journey to greatness starts here.
            </p>

            {/* Contact Info */}
            <div
              className="space-y-2 text-sm"
              style={{ color: theme.textSecondary }}
            >
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" style={{ color: theme.accent }} />
                <span>1-800-SPORT-ZONE</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" style={{ color: theme.accent }} />
                <span>support@kthsports.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" style={{ color: theme.accent }} />
                <span>123 Athletic Ave, Sports City, SC 12345</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4
                className="font-semibold mb-4"
                style={{ color: theme.accent }}
              >
                {section.title}
              </h4>

              <ul className="space-y-2">
                {section.links.map((item) => (
                  <li key={item.title} className="hover:scale-102">
                    <Link
                      to={item.link}
                      className="transition-colors duration-200 text-sm"
                      style={{ color: theme.textSecondary }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.color = theme.accent)
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.color = theme.textSecondary)
                      }
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div
          className="pt-5 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{
            borderColor: theme.textSecondary,
            color: theme.textSecondary,
          }}
        >
          <div className="text-sm">© 2025 KTH Sports. All rights reserved.</div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <span className="text-sm">Follow us:</span>
            <div className="flex gap-2">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Twitter, label: "Twitter" },
                { icon: Instagram, label: "Instagram" },
                { icon: Youtube, label: "YouTube" },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  className="h-8 w-8 rounded-md flex items-center justify-center transition-colors duration-200"
                  style={{
                    color: theme.textSecondary,
                    borderColor: theme.textSecondary,
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = theme.accent;
                    e.target.style.color = theme.textPrimary;
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = theme.textSecondary;
                  }}
                >
                  <Icon className="h-4 w-4" />
                  <span className="sr-only">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Legal Links */}
          <div className="flex gap-4 text-sm">
            <a
              href="#"
              className="transition-colors"
              style={{ color: theme.textSecondary }}
              onMouseOver={(e) => (e.target.style.color = theme.accent)}
              onMouseOut={(e) => (e.target.style.color = theme.textSecondary)}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="transition-colors"
              style={{ color: theme.textSecondary }}
              onMouseOver={(e) => (e.target.style.color = theme.accent)}
              onMouseOut={(e) => (e.target.style.color = theme.textSecondary)}
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}