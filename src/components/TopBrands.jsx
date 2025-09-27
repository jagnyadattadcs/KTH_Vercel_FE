import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext"; // Adjust path if needed

const TopBrands = () => {
  const { theme } = useTheme();

  // 👉 Routes for the top category cards
  const categories = [
    { title: "Men's", route: "/collections/men" },
    { title: "Women's", route: "/collections/women" },
    { title: "Kid's", route: "/collections/kids" },
    { title: "Unisex", route: "/collections/unisex" },
  ];

  // 👉 Routes for the product cards
  const products = [
    {
      img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      title: "Men's Performance Wear",
      route: "/collections/men",
    },
    {
      img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      title: "Women's Athletic Gear",
      route: "/collections/women",
    },
    {
      img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      title: "Kids Sports Collection",
      route: "/collections/kids",
    },
  ];

  return (
    <div
      className="w-full h-auto py-10 px-4"
      style={{ backgroundColor: theme.bgPrimary }}
    >
      {/* Top sportswear section */}
      <h1
        className="mb-12 text-center text-3xl md:text-4xl font-bold"
        style={{ color: theme.accent }}
      >
        Trending Collections
      </h1>

      {/* 👉 Category Cards */}
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-6">
        {categories.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-40 h-32 border rounded-lg flex flex-col justify-center items-center p-4 transition-all cursor-pointer shadow-lg"
            style={{
              backgroundColor: theme.bgSecondary,
              borderColor: theme.border,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${theme.accent}20`;
              e.currentTarget.style.borderColor = `${theme.accent}50`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = theme.bgSecondary;
              e.currentTarget.style.borderColor = theme.border;
            }}
          >
            {/* ✅ Link to dynamic route */}
            <Link to={item.route} className="text-center block w-full h-full">
              <h1
                className="text-lg font-bold mb-2"
                style={{ color: theme.textPrimary }}
              >
                {item.title}
              </h1>
              <p className="text-xs" style={{ color: theme.textSecondary }}>
                Shop top {item.title.toLowerCase()} sports collection
              </p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quote */}
      <div className="text-center w-full mt-16 mb-12">
        <h3
          className="text-xl font-medium max-w-3xl mx-auto leading-relaxed"
          style={{ color: theme.textSecondary }}
        >
          Upgrade your game with{" "}
          <span style={{ color: theme.accent, fontWeight: "bold" }}>KTH</span>{" "}
          sportswear designed for champions.
          <br className="hidden md:block" />
          Grab{" "}
          <span style={{ color: theme.accent, fontWeight: "bold" }}>
            exclusive discounts
          </span>{" "}
          today - limited time only!
        </h3>
      </div>

      {/* 👉 Product Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="border rounded-xl p-4 group flex flex-col gap-4 shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer"
            style={{
              backgroundColor: theme.bgSecondary,
              borderColor: theme.border,
            }}
          >
            <Link to={item.route} className="block">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t"
                  style={{
                    background: `linear-gradient(to top, ${theme.bgPrimary}80, transparent)`,
                  }}
                ></div>
              </div>

              <div className="text-center mt-4">
                <p
                  className="font-semibold text-lg mb-3"
                  style={{ color: theme.textPrimary }}
                >
                  {item.title}
                </p>
                <button
                  className="px-6 py-2 font-medium rounded-lg transition-colors duration-300"
                  style={{
                    backgroundColor: theme.accent,
                    color: theme.textPrimary,
                  }}
                >
                  Explore Collection
                </button>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Additional call to action */}
      <div className="text-center mt-16">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 font-bold rounded-lg transition-colors duration-300 text-lg"
          style={{
            backgroundColor: theme.accent,
            color: theme.textPrimary,
          }}
        >
          <Link to="/collections">View All Collections</Link>
        </motion.button>
      </div>
    </div>
  );
};

export default TopBrands;
