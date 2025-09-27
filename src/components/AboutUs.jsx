import React from "react";
import { Award, Users, Target, Heart } from "lucide-react";
import { useTheme } from "../context/ThemeContext"; // Adjust path as needed

const AboutUs = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.bgPrimary, color: theme.textPrimary }}>
      {/* Hero Section */}
      <div 
        className="relative py-10 px-4"
        style={{ background: `linear-gradient(to bottom, ${theme.bgSecondary}, ${theme.bgPrimary})` }}
      >
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About <span style={{ color: theme.accent }}>KTH Sports</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: theme.textSecondary }}>
            Empowering athletes with premium sportswear and equipment for over a decade.
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left Side - Image */}
          <div className="lg:w-1/2">
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHNwb3J0cyUyMHN0b3JlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="KTH Sports Store"
                className="w-full h-auto object-cover"
              />
              <div 
                className="absolute inset-0"
                style={{ background: `linear-gradient(to top, ${theme.bgPrimary}80, transparent)` }}
              ></div>
              <div className="absolute bottom-6 left-6">
                <div 
                  className="px-4 py-2 rounded-md font-semibold"
                  style={{ backgroundColor: theme.accent, color: theme.textPrimary }}
                >
                  Since 2010
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-6" style={{ color: theme.accent }}>
              Our Story
            </h2>
            <div className="space-y-6" style={{ color: theme.textSecondary }}>
              <p>
                Founded in 2010, KTH Sports began as a small store with a big dream: to provide athletes with 
                the highest quality sportswear and equipment. What started as a passion project has grown into 
                a trusted destination for professional athletes and fitness enthusiasts alike.
              </p>
              <p>
                We specialize in premium sports apparel including t-shirts, pants, shorts, shoes, towels, 
                leggings, and top wears. Our products are designed to enhance performance, provide maximum 
                comfort, and withstand the rigors of intense training and competition.
              </p>
              <p>
                At KTH Sports, we believe that the right gear can make all the difference. That's why we 
                meticulously select every item in our collection, ensuring it meets our strict standards 
                for quality, durability, and performance.
              </p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 gap-6 mt-10">
              <div 
                className="text-center p-4 rounded-lg"
                style={{ backgroundColor: theme.bgSecondary }}
              >
                <Users className="h-8 w-8 mx-auto mb-2" style={{ color: theme.accent }} />
                <div className="text-2xl font-bold">50K+</div>
                <div style={{ color: theme.textSecondary }}>Happy Customers</div>
              </div>
              <div 
                className="text-center p-4 rounded-lg"
                style={{ backgroundColor: theme.bgSecondary }}
              >
                <Award className="h-8 w-8 mx-auto mb-2" style={{ color: theme.accent }} />
                <div className="text-2xl font-bold">25+</div>
                <div style={{ color: theme.textSecondary }}>Brands</div>
              </div>
              <div 
                className="text-center p-4 rounded-lg"
                style={{ backgroundColor: theme.bgSecondary }}
              >
                <Target className="h-8 w-8 mx-auto mb-2" style={{ color: theme.accent }} />
                <div className="text-2xl font-bold">1000+</div>
                <div style={{ color: theme.textSecondary }}>Products</div>
              </div>
              <div 
                className="text-center p-4 rounded-lg"
                style={{ backgroundColor: theme.bgSecondary }}
              >
                <Heart className="h-8 w-8 mx-auto mb-2" style={{ color: theme.accent }} />
                <div className="text-2xl font-bold">12+</div>
                <div style={{ color: theme.textSecondary }}>Years</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Values Section */}
        <div className="py-16 mt-16 border-t" style={{ borderColor: theme.border }}>
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: theme.accent }}>
            Our Mission & Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div 
              className="text-center p-6 rounded-lg"
              style={{ backgroundColor: theme.bgSecondary }}
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: `${theme.accent}20` }}
              >
                <Target className="h-6 w-6" style={{ color: theme.accent }} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: theme.textPrimary }}>Our Mission</h3>
              <p style={{ color: theme.textSecondary }}>
                To empower athletes of all levels with premium quality sportswear that enhances performance 
                and inspires confidence in every workout, game, and competition.
              </p>
            </div>
            <div 
              className="text-center p-6 rounded-lg"
              style={{ backgroundColor: theme.bgSecondary }}
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: `${theme.accent}20` }}
              >
                <Eye className="h-6 w-6" style={{ color: theme.accent }} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: theme.textPrimary }}>Our Vision</h3>
              <p style={{ color: theme.textSecondary }}>
                To become the most trusted sports apparel brand globally, recognized for innovation, 
                quality, and commitment to athletic excellence.
              </p>
            </div>
            <div 
              className="text-center p-6 rounded-lg"
              style={{ backgroundColor: theme.bgSecondary }}
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: `${theme.accent}20` }}
              >
                <Star className="h-6 w-6" style={{ color: theme.accent }} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: theme.textPrimary }}>Our Promise</h3>
              <p style={{ color: theme.textSecondary }}>
                We guarantee exceptional quality, innovative designs, and unmatched customer service 
                with every product we offer and every interaction we have.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Adding the missing icons used in the component
const Eye = ({ className, style }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className} 
    style={style}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const Star = ({ className, style }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className} 
    style={style}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

export default AboutUs;