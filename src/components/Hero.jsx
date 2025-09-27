import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext"; // Adjust path based on your folder structure
import { Link } from "react-router-dom";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { theme } = useTheme();

  const carouselData = [
    {
      id: 0,
      category: "MEN",
      title: "Premium Men's Collection",
      description: "Discover the latest trends in men's fashion with our premium collection featuring contemporary designs and superior quality.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&crop=face",
      link: "/collections/men"
    },
    {
      id: 1,
      category: "WOMEN",
      title: "Elegant Women's Fashion",
      description: "Embrace sophistication with our curated women's collection that combines style, comfort, and modern elegance.",
      image: "https://images.unsplash.com/photo-1622214628506-f55f72b92b46?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "/collections/women"
    },
    {
      id: 2,
      category: "KIDS",
      title: "Playful Kids Collection",
      description: "Fun and comfortable clothing designed for active kids who love to explore, play, and express their unique personality.",
      image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&h=400&fit=crop&crop=face",
      link: "/collections/kids"
    },
    {
      id: 3,
      category: "UNISEX",
      title: "Versatile Unisex Styles",
      description: "Inclusive fashion that transcends boundaries with versatile designs perfect for everyone's unique style preferences.",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=400&fit=crop&crop=center",
      link: "/collections/unisex"
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length);
  };

  const handleDragEnd = (event, info) => {
    const threshold = 100;
    
    if (info.offset.x < -threshold) {
      // Swipe left - next slide
      nextSlide();
    } else if (info.offset.x > threshold) {
      // Swipe right - previous slide
      prevSlide();
    }
  };

  return (
    <div 
      className="w-full py-12 px-4 md:px-8"
      style={{ backgroundColor: theme.bgPrimary }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
        >
          {/* Left Side - Text Content */}
          <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
            <div 
              className="inline-block px-4 py-2 rounded-full"
              style={{ backgroundColor: theme.accent }}
            >
              <span 
                className="text-sm font-medium tracking-wider"
                style={{ color: theme.textPrimary }}
              >
                {carouselData[currentSlide].category}
              </span>
            </div>
            
            <h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
              style={{ color: theme.textPrimary }}
            >
              {carouselData[currentSlide].title}
            </h1>
            
            <p 
              className="text-lg leading-relaxed max-w-lg mx-auto lg:mx-0"
              style={{ color: theme.textSecondary }}
            >
              {carouselData[currentSlide].description}
            </p>
            
            <Link to={carouselData[currentSlide].link} 
              className="px-6 py-3 font-semibold rounded-lg transition-colors duration-300"
              style={{ 
                backgroundColor: theme.accent,
                color: theme.textPrimary
              }}
              onMouseEnter={(e) => {
                e.target.style.opacity = "0.9";
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = "1";
              }}
            >
              Explore Collection
            </Link>
          </div>

          {/* Right Side - Image */}
          <div className="lg:w-1/2">
            <motion.img
              key={currentSlide}
              src={carouselData[currentSlide].image}
              alt={carouselData[currentSlide].category}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="w-full h-72 md:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        </motion.div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-8 space-x-3">
          {carouselData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "scale-125"
                  : "hover:opacity-70"
              }`}
              style={{
                backgroundColor: index === currentSlide 
                  ? theme.accent 
                  : theme.textSecondary
              }}
            />
          ))}
        </div>

        {/* Navigation Instructions */}
        <p 
          className="text-center mt-4 text-sm"
          style={{ color: theme.textSecondary }}
        >
          Swipe left or right to navigate
        </p>
      </div>
    </div>
  );
};

export default Hero;