import React, { useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext"; // Adjust path as needed

const SliderPageTwo = () => {
  const { theme } = useTheme();

  const slides = [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      title: "Find Your Perfect Pair",
      subtitle: "Step into Comfort & Performance",
      price: "₹999 Onwards",
      btn: "Shop Now",
      route: "/collections/shoes", // ✅ target route
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      title: "Exclusive Sports Gear",
      subtitle: "Style Meets Performance",
      price: "₹799 Onwards",
      btn: "Shop Now",
      route: "/collections/sports-gear",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1556906781-2f0520405b71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      title: "Upgrade Your Game",
      subtitle: "Top Sports Collection",
      price: "₹499 Onwards",
      btn: "Shop Now",
      route: "/collections/top-collection",
    },
  ];

  const categories = [
    { name: "Leggings", img: "/leggings.png", route: "/collections/men/leggings" },
    { name: "Shorts", img: "/shorts-men.png", route: "/collections/men/shorts" },
    { name: "Trousers", img: "/trouser.png", route: "/collections/men/trousers" },
    { name: "Shoes", img: "/shoes-sports.png", route: "/collections/men/shoes" },
    { name: "Towel", img: "/towel.png", route: "/collections/men/towel" },
    { name: "T-shirts", img: "/tshirt-sports.png", route: "/collections/men/t-shirt" },
    { name: "Fleece", img: "/flees-sports.png", route: "/collections/men/fleece" },
    { name: "Jackets", img: "/jacket-sports.png", route: "/collections/men/jackets" },
  ];

  const [current, setCurrent] = useState(0);

  const prevSlide = () =>
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  const nextSlide = () =>
    setCurrent(current === slides.length - 1 ? 0 : current + 1);

  // Auto Slide
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(timer);
  }, [current]);

  return (
    <div className="w-full py-12 px-4" style={{ backgroundColor: theme.bgPrimary }}>
      {/* =================== SLIDER =================== */}
      <div className="relative max-w-7xl mx-auto h-[400px] md:h-[500px] rounded-xl overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-full object-cover rounded-xl"
            />

            {/* Text Overlay */}
            <div
              className="absolute inset-0 flex flex-col justify-center pl-8 md:pl-16"
              style={{
                background: `linear-gradient(to right, ${theme.bgPrimary}80, transparent)`,
                color: theme.textPrimary,
              }}
            >
              <div className="max-w-md">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  {slide.title}
                </h2>
                <p
                  className="text-lg md:text-xl mb-6"
                  style={{ color: theme.textSecondary }}
                >
                  {slide.subtitle}
                </p>
                <p
                  className="text-xl md:text-2xl font-bold mb-6"
                  style={{ color: theme.accent }}
                >
                  {slide.price}
                </p>

                {/* ✅ Shop Now Button with Link */}
                <Link to={slide.route}>
                  <button
                    className="px-8 py-3 font-semibold rounded-lg transition-colors duration-300"
                    style={{
                      backgroundColor: theme.accent,
                      color: theme.textPrimary,
                    }}
                  >
                    {slide.btn}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 -translate-y-1/2 p-3 rounded-full border transition-colors"
          style={{
            backgroundColor: theme.bgSecondary,
            borderColor: theme.border,
            color: theme.textPrimary,
          }}
        >
          <MdChevronLeft size={25} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 -translate-y-1/2 p-3 rounded-full border transition-colors"
          style={{
            backgroundColor: theme.bgSecondary,
            borderColor: theme.border,
            color: theme.textPrimary,
          }}
        >
          <MdChevronRight size={25} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 w-full flex justify-center gap-3">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                current === idx ? "scale-125" : "hover:bg-gray-400"
              }`}
              style={{
                backgroundColor: current === idx ? theme.accent : theme.textSecondary,
              }}
            />
          ))}
        </div>
      </div>

      {/* =================== CATEGORIES =================== */}
      <div className="max-w-7xl mx-auto mt-12">
        <h3
          className="text-2xl font-bold mb-8 text-center"
          style={{ color: theme.textPrimary }}
        >
          Shop by Category
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-6">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              to={cat.route}
              className="group flex flex-col items-center border rounded-xl p-4 transition-all duration-300 cursor-pointer"
              style={{
                backgroundColor: theme.bgSecondary,
                borderColor: theme.border,
              }}
            >
              <div
                className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-lg transition-colors"
                style={{ backgroundColor: theme.bgPrimary }}
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="h-12 md:h-14 object-contain group-hover:scale-110 transition-transform"
                />
              </div>
              <p
                className="mt-3 text-sm font-medium text-center"
                style={{ color: theme.textPrimary }}
              >
                {cat.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SliderPageTwo;
