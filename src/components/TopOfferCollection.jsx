import React, { useEffect, useRef, useState } from "react";
import { FaStar, FaRegHeart } from "react-icons/fa";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useTheme } from "../context/ThemeContext"; // Adjust path as needed
import { useNavigate } from "react-router-dom";

const TopOfferCollection = () => {
  const { theme } = useTheme();
  const scrollerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      title: "Sports Leggings for women",
      brand: "Leggings",
      img: "/leggings.png",
      rating: 4.8,
      reviews: "1.4k",
      tag: "Price drop",
      link: "/collections/women/leggings", 
    },
    {
      id: 2,
      title: "Mens Shorts",
      brand: "Shorts",
      img: "/shorts-men.png",
      rating: 4.6,
      reviews: "511",
      tag: "Sport Picks",
      link: "/collections/men/shorts"
    },
    {
      id: 3,
      title: "Trousers men & women",
      brand: "Trouser",
      img: "/trouser.png",
      rating: 4.7,
      reviews: "6k",
      link: "/collections/unisex/shorts"
    },
    {
      id: 4,
      title: "Shoes for men, women and kids",
      brand: "Shoes",
      img: "/shoes-sports.png",
      rating: 4.7,
      reviews: "759",
      tag: "Price drop",
      link: "/collections/unisex/shoes"
    },
    {
      id: 5,
      title: "Sports towels",
      brand: "Towels",
      img: "/towel.png",
      rating: 4.7,
      reviews: "907",
      link: "/collections/unisex/towels"
    },
    {
      id: 6,
      title: "Sports T-shirts",
      brand: "T-Shirts",
      img: "/tshirt-sports.png",
      rating: 4.7,
      reviews: "907",
      link: "/collections/unisex/t-shirt"
    },
    {
      id: 7,
      title: "Sports Flees",
      brand: "Flees",
      img: "/flees-sports.png",
      rating: 4.7,
      reviews: "907",
      link: "/collections/unisex/flees"
    },
    {
      id: 8,
      title: "Sports Jackets",
      brand: "Jackets",
      img: "/jacket-sports.png",
      rating: 4.7,
      reviews: "907",
      link: "/collections/unisex/jackets"
    },
  ];

  // Hide scrollbar without plugin
  useEffect(() => {
    // Update arrow enabled/disabled states
    const update = () => {
      const el = scrollerRef.current;
      if (!el) return;
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    };

    update();

    const el = scrollerRef.current;
    if (!el) return;

    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollBy = (dir = 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.9); // scroll nearly a page
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <div className="w-full py-12 px-4" style={{ backgroundColor: theme.bgPrimary }}>
      {/* small helper style to hide scrollbar (works on all major browsers) */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-sm font-semibold" style={{ color: theme.accent }}>
              Top Offers
            </h3>
            <h2 className="text-2xl md:text-3xl font-bold mt-1" style={{ color: theme.textPrimary }}>
              TOP COLLECTION
            </h2>
          </div>

          {/* Controls (top-right like screenshot) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollBy(-1)}
              disabled={!canScrollLeft}
              className={`p-2 rounded-full border transition
                ${canScrollLeft ? "hover:bg-[#FF8C00] hover:border-[#FF8C00]" : "opacity-40 cursor-not-allowed"}`}
              style={{ 
                backgroundColor: theme.bgSecondary,
                borderColor: theme.border,
                color: theme.textPrimary
              }}
              aria-label="Scroll left"
            >
              <MdChevronLeft size={24} />
            </button>
            <button
              onClick={() => scrollBy(1)}
              disabled={!canScrollRight}
              className={`p-2 rounded-full border transition
                ${canScrollRight ? "hover:bg-[#FF8C00] hover:border-[#FF8C00]" : "opacity-40 cursor-not-allowed"}`}
              style={{ 
                backgroundColor: theme.bgSecondary,
                borderColor: theme.border,
                color: theme.textPrimary
              }}
              aria-label="Scroll right"
            >
              <MdChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Card scroller */}
        <div
          ref={scrollerRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4"
        >
          {products.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(item.link)}
              className="relative w-[220px] flex-shrink-0 border rounded-xl overflow-hidden group transition-all duration-300"
              style={{ 
                backgroundColor: theme.bgSecondary,
                borderColor: theme.border
              }}
            >
              {/* Tag */}
              {item.tag && (
                <span 
                  className="absolute left-3 top-3 z-10 text-xs font-bold px-3 py-1 rounded-full"
                  style={{ 
                    backgroundColor: theme.accent,
                    color: theme.textPrimary
                  }}
                >
                  {item.tag}
                </span>
              )}

              {/* Wishlist Button */}
              <button
                className="absolute right-3 top-3 z-10 p-2 rounded-full border transition-colors"
                style={{ 
                  backgroundColor: theme.bgSecondary,
                  borderColor: theme.border,
                  color: theme.textPrimary
                }}
                aria-label="Add to wishlist"
              >
                <FaRegHeart size={16} />
              </button>

              {/* Image */}
              <div 
                className="w-full h-48 flex items-center justify-center relative overflow-hidden"
                style={{ backgroundColor: theme.bgPrimary }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="object-contain h-40 group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Details */}
              <div className="p-4">
                {/* Rating Row */}
                <div className="flex items-center text-sm mb-3">
                  <div 
                    className="flex items-center px-2 py-1 rounded-full"
                    style={{ backgroundColor: `${theme.accent}20` }}
                  >
                    <FaStar className="mr-1" style={{ color: theme.accent }} />
                    <span className="font-semibold" style={{ color: theme.textPrimary }}>
                      {item.rating}
                    </span>
                    <span className="ml-1" style={{ color: theme.textSecondary }}>
                      ({item.reviews})
                    </span>
                  </div>
                </div>

                {/* Brand */}
                <h4 className="text-sm font-semibold mb-1" style={{ color: theme.accent }}>
                  {item.brand}
                </h4>

                {/* Title */}
                <p 
                  className="text-sm font-medium mb-4 line-clamp-2 h-10"
                  style={{ color: theme.textPrimary }}
                >
                  {item.title}
                </p>

                {/* CTA Button - Same as your design */}
                <button 
                  className="w-full py-3 bg-transparent border font-semibold rounded-lg transition-colors duration-300 group-hover:scale-105"
                  style={{ 
                    borderColor: theme.border,
                    color: theme.textPrimary
                  }}
                >
                  View Collection
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopOfferCollection;