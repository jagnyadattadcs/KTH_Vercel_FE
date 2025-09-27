import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { Button } from "./ui/Button.jsx";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const { theme } = useTheme();
  const [showVideo, setShowVideo] = useState(false);

  const handleWatchStory = () => {
    setShowVideo(true);
  };

  const closeVideo = () => {
    setShowVideo(false);
  };

  // Close video when clicking outside
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeVideo();
    }
  };

  return (
    <section 
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: theme.bgPrimary }}
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          src="/KTH.mp4"
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
        />
        <div 
          className="absolute inset-0"
          style={{ backgroundColor: theme.bgPrimary, opacity: 0.4 }}
        />

        {/* Animated Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-r animate-gradient-xy mix-blend-overlay bg-[length:200%_200%]"
          style={{ 
            background: `linear-gradient(to right, ${theme.accent}30, rgba(255, 255, 255, 0.2), ${theme.accent}30)`
          }}
        />
      </div>

      {/* Video Dialog Modal */}
      {showVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90"
          onClick={handleBackdropClick}
        >
          <div className="relative w-full max-w-4xl mx-auto">
            {/* Close Button */}
            <button
              onClick={closeVideo}
              className="absolute -top-12 right-0 z-60 p-2 rounded-full hover:bg-gray-700 transition-colors"
              style={{ backgroundColor: theme.bgSecondary, color: theme.textPrimary }}
              aria-label="Close video"
            >
              <X size={24} />
            </button>
            
            {/* Video Container */}
            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Our Story - Brand Video"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
            
            {/* Responsive fallback for mobile */}
            <div className="mt-4 text-center">
              <p className="text-sm" style={{ color: theme.textSecondary }}>
                Having trouble playing the video?{" "}
                <a
                  href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:opacity-80"
                  style={{ color: theme.accent }}
                >
                  Watch on YouTube
                </a>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up">
          <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-balance"
            style={{ color: theme.textPrimary }}
          >
            <span style={{ color: theme.accent }}>Unleash</span> Your
            Athletic<span style={{ color: theme.accent }}> Potential</span>
          </h1>

          <p 
            className="text-lg md:text-xl max-w-2xl mx-auto text-pretty"
            style={{ color: theme.textSecondary }}
          >
            Discover premium sportswear designed for champions. From professional athletes to weekend warriors, find
            your perfect gear.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link to="/collections" className="rounded-md overflow-hidden">
              <Button
                text={"Shop Now"}
                icon={"arrow"}
                style={{ backgroundColor: theme.accent, color: theme.textPrimary }}
              />
            </Link>

            <Button
              text={"Watch Story"}
              icon={"play"}
              style={{ 
                // backgroundColor: "transparent",
                borderColor: theme.accent,
                color: theme.accent
              }}
              onClick={handleWatchStory}
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 max-w-md mx-auto">
            <div className="text-center">
              <div 
                className="text-2xl md:text-3xl font-bold"
                style={{ color: theme.accent }}
              >50K+</div>
              <div 
                className="text-sm"
                style={{ color: theme.textSecondary }}
              >Happy Athletes</div>
            </div>
            <div className="text-center">
              <div 
                className="text-2xl md:text-3xl font-bold"
                style={{ color: theme.accent }}
              >1000+</div>
              <div 
                className="text-sm"
                style={{ color: theme.textSecondary }}
              >Products</div>
            </div>
            <div className="text-center">
              <div 
                className="text-2xl md:text-3xl font-bold"
                style={{ color: theme.accent }}
              >25+</div>
              <div 
                className="text-sm"
                style={{ color: theme.textSecondary }}
              >Brands</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div 
          className="w-6 h-10 border-2 rounded-full flex justify-center"
          style={{ borderColor: theme.accent }}
        >
          <div 
            className="w-1 h-3 rounded-full mt-2 animate-pulse"
            style={{ backgroundColor: theme.textPrimary }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;