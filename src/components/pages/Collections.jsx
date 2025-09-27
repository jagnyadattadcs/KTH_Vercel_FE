import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, Filter, X, Menu } from "lucide-react";
import { useProductContext } from "../../context/ProductContext";
import { useTheme } from "../../context/ThemeContext"; // Import the useTheme hook
import { useParams } from "react-router-dom";

const categories = [
  "t-shirt",
  "towels",
  "shoes",
  "accessories",
  "leggings",
  "shorts",
  "trousers",
  "fleece",
  "jackets",
];

const categoryMapping = {
  tshirts: "t-shirt",
  towels: "towels",
  shoes: "shoes",
  accessories: "accessories",
  leggings: "leggings",
  shorts: "shorts",
  trousers: "trousers",
  fleece: "fleece",
  jackets: "jackets",
  dresses: "dresses",
  tops: "tops",
  skirts: "skirts",
  handbags: "handbags",
  jeans: "jeans",
  // Add more mappings as needed
};

const types = ["men", "women", "kids", "unisex"];
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

const Collections = () => {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    types: true,
  });
  const { products } = useProductContext();
  const { theme } = useTheme(); // Get the current theme

  // Get URL parameters
  const { category, type } = useParams();

  // Apply filters based on URL parameters when component mounts
  // useEffect(() => {
  //   if (category) {
  //     setSelectedCategory([category.toLowerCase()]);
  //   }

  //   if (type) {
  //     setSelectedType([type.toLowerCase()]);
  //   }
  // }, [category, type]);

  // Update the useEffect to use the mapping
  useEffect(() => {
    if (category && categoryMapping[category]) {
      setSelectedCategory([categoryMapping[category]]);
    }

    if (type) {
      setSelectedType([type.toLowerCase()]);
    }
  }, [category, type]);

  // 🔹 Handle category filter
  const handleCategoryChange = (value) => {
    setSelectedCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // 🔹 Handle type filter
  const handleTypeChange = (value) => {
    setSelectedType((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // 🔹 Handle size filter under each type
  const handleSizeChange = (type, size) => {
    setSelectedSizes((prev) => {
      const currentSizes = prev[type] || [];
      return {
        ...prev,
        [type]: currentSizes.includes(size)
          ? currentSizes.filter((s) => s !== size)
          : [...currentSizes, size],
      };
    });
  };

  // 🔹 Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // 🔹 Clear all filters
  const clearFilters = () => {
    setSelectedCategory([]);
    setSelectedType([]);
    setSelectedSizes({});
  };

  // In your Collections component
  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategory.length === 0 ||
      selectedCategory.some((cat) =>
        product.category.toLowerCase().includes(cat.toLowerCase())
      );

    const typeMatch =
      selectedType.length === 0 ||
      selectedType.some((t) =>
        product.type.toLowerCase().includes(t.toLowerCase())
      );

    const sizeMatch =
      selectedType.length === 0 ||
      !selectedType.some((t) => selectedSizes[t]?.length > 0) ||
      selectedType.some(
        (t) =>
          selectedSizes[t]?.length > 0 &&
          product.type.toLowerCase().includes(t.toLowerCase()) &&
          product.sizes.some((s) => selectedSizes[t].includes(s))
      );

    return categoryMatch && typeMatch && sizeMatch;
  });

  return (
    <div
      className="flex flex-col md:flex-row min-h-screen"
      style={{ backgroundColor: theme.bgPrimary }}
    >
      {/* Mobile Filter Toggle */}
      <div
        className="md:hidden flex justify-between items-center p-4 border-b sticky top-0 z-20 shadow-sm"
        style={{
          backgroundColor: theme.bgSecondary,
          borderColor: theme.border,
        }}
      >
        <button
          onClick={() => setSidebarOpen(true)}
          className="px-4 py-2 border rounded-md flex items-center gap-2 transition-colors"
          style={{
            backgroundColor: theme.bgSecondary,
            borderColor: theme.border,
            color: theme.textSecondary,
          }}
        >
          <Menu size={18} />
          Filters
          {(selectedCategory.length > 0 || selectedType.length > 0) && (
            <span
              className="text-xs rounded-full h-5 w-5 flex items-center justify-center"
              style={{
                backgroundColor: theme.accent,
                color: theme.textPrimary,
              }}
            >
              {selectedCategory.length + selectedType.length}
            </span>
          )}
        </button>
        <h1 className="text-xl font-bold" style={{ color: theme.textPrimary }}>
          Collections
        </h1>
        <div className="w-10"></div> {/* Spacer for balance */}
      </div>

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "fixed inset-0 z-30 md:bg-transparent" : "hidden"
        } md:block w-full md:w-64 border-r overflow-y-auto md:sticky md:top-0 md:h-screen transition-all duration-300`}
        style={{
          backgroundColor: theme.bgSecondary,
          borderColor: theme.border,
        }}
      >
        <div className="p-5">
          <div className="flex justify-between items-center mb-6">
            <h2
              className="text-xl font-bold"
              style={{ color: theme.textPrimary }}
            >
              Filters
            </h2>
            <div className="flex items-center gap-2">
              {(selectedCategory.length > 0 || selectedType.length > 0) && (
                <button
                  onClick={clearFilters}
                  className="text-sm font-medium transition-colors duration-200"
                  style={{ color: theme.accent }}
                  onMouseOver={(e) =>
                    (e.target.style.color = theme.textPrimary)
                  }
                  onMouseOut={(e) => (e.target.style.color = theme.accent)}
                >
                  Clear all
                </button>
              )}
              <button
                className="md:hidden"
                onClick={() => setSidebarOpen(false)}
                style={{ color: theme.textSecondary }}
                onMouseOver={(e) => (e.target.style.color = theme.textPrimary)}
                onMouseOut={(e) => (e.target.style.color = theme.textSecondary)}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Categories */}
          <div
            className="mb-6 border-b pb-4"
            style={{ borderColor: theme.border }}
          >
            <button
              className="flex justify-between items-center w-full font-medium mb-2 text-left transition-colors"
              onClick={() => toggleSection("categories")}
              style={{ color: theme.accent }}
            >
              <span>Categories</span>
              {expandedSections.categories ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>

            {expandedSections.categories && (
              <ul className="space-y-2 mt-3">
                {categories.map((cat) => (
                  <li key={cat}>
                    <label
                      className={`flex items-center gap-3 p-1 rounded-md cursor-pointer transition-colors ${
                        selectedCategory.includes(cat)
                          ? "text-white"
                          : "hover:text-white"
                      }`}
                      style={{
                        backgroundColor: selectedCategory.includes(cat)
                          ? theme.accent
                          : "transparent",
                        color: selectedCategory.includes(cat)
                          ? theme.textPrimary
                          : theme.textSecondary,
                      }}
                      onMouseOver={(e) => {
                        if (!selectedCategory.includes(cat)) {
                          e.target.style.backgroundColor = `${theme.accent}50`;
                        }
                      }}
                      onMouseOut={(e) => {
                        if (!selectedCategory.includes(cat)) {
                          e.target.style.backgroundColor = "transparent";
                        }
                      }}
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 border-gray-600 rounded focus:ring-0"
                        style={{
                          color: theme.accent,
                          borderColor: theme.border,
                        }}
                        onChange={() => handleCategoryChange(cat)}
                        checked={selectedCategory.includes(cat)}
                      />
                      <span className="capitalize">{cat}</span>
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Types */}
          <div className="mb-6">
            <button
              className="flex justify-between items-center w-full font-medium mb-2 text-left transition-colors"
              onClick={() => toggleSection("types")}
              style={{ color: theme.accent }}
            >
              <span>Types</span>
              {expandedSections.types ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>

            {expandedSections.types && (
              <ul className="space-y-2 mt-3">
                {types.map((t) => (
                  <li key={t}>
                    <label
                      className={`flex items-center gap-3 p-1 rounded-md cursor-pointer transition-colors ${
                        selectedType.includes(t)
                          ? "text-white"
                          : "hover:text-white"
                      }`}
                      style={{
                        backgroundColor: selectedType.includes(t)
                          ? theme.accent
                          : "transparent",
                        color: selectedType.includes(t)
                          ? theme.textPrimary
                          : theme.textSecondary,
                      }}
                      onMouseOver={(e) => {
                        if (!selectedType.includes(t)) {
                          e.target.style.backgroundColor = `${theme.accent}50`;
                        }
                      }}
                      onMouseOut={(e) => {
                        if (!selectedType.includes(t)) {
                          e.target.style.backgroundColor = "transparent";
                        }
                      }}
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 border-gray-600 rounded focus:ring-0"
                        style={{
                          color: theme.accent,
                          borderColor: theme.border,
                        }}
                        onChange={() => handleTypeChange(t)}
                        checked={selectedType.includes(t)}
                      />
                      <span className="capitalize">{t}</span>
                    </label>

                    {/* Sub-sizes if type is selected */}
                    {selectedType.includes(t) && (
                      <div
                        className="ml-6 mt-2 p-3 rounded-md border"
                        style={{
                          backgroundColor: theme.bgPrimary,
                          borderColor: theme.border,
                        }}
                      >
                        <p
                          className="text-sm font-medium mb-2"
                          style={{ color: theme.textSecondary }}
                        >
                          Sizes for {t}
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                          {sizes.map((s) => (
                            <label
                              key={s}
                              className="flex items-center gap-2 text-sm"
                              style={{ color: theme.textSecondary }}
                            >
                              <input
                                type="checkbox"
                                className="h-3 w-3 border-gray-600 rounded focus:ring-0"
                                style={{
                                  color: theme.accent,
                                  borderColor: theme.border,
                                }}
                                onChange={() => handleSizeChange(t, s)}
                                checked={selectedSizes[t]?.includes(s) || false}
                              />
                              {s}
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Product Grid */}
      <div
        className="flex-1 p-4 md:p-6"
        style={{ backgroundColor: theme.bgSecondary }}
      >
        <div className="hidden md:flex justify-between items-center mb-6">
          <h1
            className="text-2xl md:text-3xl font-bold"
            style={{ color: theme.textPrimary }}
          >
            Premium Athletic Collections (
            <span style={{ color: theme.accent }}>
              {filteredProducts.length} products
            </span>
            )
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="px-4 py-2 border rounded-md flex items-center gap-2 transition-colors"
            style={{
              backgroundColor: theme.bgSecondary,
              borderColor: theme.border,
              color: theme.textSecondary,
            }}
          >
            <Filter size={18} />
            {sidebarOpen ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* Active filters */}
        {(selectedCategory.length > 0 || selectedType.length > 0) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedCategory.map((cat) => (
              <span
                key={cat}
                className="text-sm px-3 py-1 rounded-full flex items-center gap-1 border"
                style={{
                  backgroundColor: `${theme.accent}10`,
                  color: theme.accent,
                  borderColor: `${theme.accent}20`,
                }}
              >
                {cat}
                <button
                  onClick={() => handleCategoryChange(cat)}
                  style={{ color: theme.accent }}
                  onMouseOver={(e) =>
                    (e.target.style.color = theme.textPrimary)
                  }
                  onMouseOut={(e) => (e.target.style.color = theme.accent)}
                >
                  <X size={14} />
                </button>
              </span>
            ))}
            {selectedType.map((type) => (
              <span
                key={type}
                className="text-sm px-3 py-1 rounded-full flex items-center gap-1 border"
                style={{
                  backgroundColor: `${theme.accent}10`,
                  color: theme.accent,
                  borderColor: `${theme.accent}20`,
                }}
              >
                {type}
                <button
                  onClick={() => handleTypeChange(type)}
                  style={{ color: theme.accent }}
                  onMouseOver={(e) =>
                    (e.target.style.color = theme.textPrimary)
                  }
                  onMouseOut={(e) => (e.target.style.color = theme.accent)}
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 justify-center">
          {filteredProducts.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="flex justify-center"
            >
              <div
                className="w-full max-w-xs p-4 rounded-lg shadow-sm transition-all duration-300 cursor-pointer group overflow-hidden border"
                style={{
                  backgroundColor: theme.bgPrimary,
                  borderColor: theme.border,
                  boxShadow: `0 1px 3px 0 ${theme.border}20`,
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = `0 4px 6px -1px ${theme.accent}20, 0 2px 4px -1px ${theme.accent}10`;
                  e.currentTarget.style.borderColor = `${theme.accent}50`;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = `0 1px 3px 0 ${theme.border}20`;
                  e.currentTarget.style.borderColor = theme.border;
                }}
              >
                <div className="relative overflow-hidden rounded-md mb-3">
                  <img
                    src={product.variants[0].images[0]}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                      <span
                        className="text-white font-medium px-2 py-1 rounded text-xs"
                        style={{ backgroundColor: theme.accent }}
                      >
                        Out of Stock
                      </span>
                    </div>
                  )}
                  <div
                    className="absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded"
                    style={{
                      backgroundColor: theme.accent,
                      color: theme.textPrimary,
                    }}
                  >
                    NEW
                  </div>
                </div>
                <h3
                  className="text-sm font-semibold transition-colors group-hover:text-[#FF8C00]"
                  style={{ color: theme.textPrimary }}
                  onMouseOver={(e) => (e.target.style.color = theme.accent)}
                  onMouseOut={(e) => (e.target.style.color = theme.textPrimary)}
                >
                  {product.brand}
                </h3>
                <p
                  className="text-sm mt-1 line-clamp-2"
                  style={{ color: theme.textSecondary }}
                >
                  {product.name}
                </p>
                <div className="flex justify-between items-center mt-3">
                  <p className="font-bold" style={{ color: theme.textPrimary }}>
                    ₹{product.price.toLocaleString()}
                  </p>
                  {product.availableSizes && (
                    <div
                      className="text-xs"
                      style={{ color: theme.textSecondary }}
                    >
                      Sizes: {product.availableSizes.join(", ")}
                    </div>
                  )}
                </div>
                <button
                  className="w-full mt-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  style={{
                    backgroundColor: theme.bgSecondary,
                    color: theme.textSecondary,
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = theme.accent;
                    e.target.style.color = theme.textPrimary;
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = theme.bgSecondary;
                    e.target.style.color = theme.textSecondary;
                  }}
                >
                  View Details
                </button>
              </div>
            </Link>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div
            className="text-center py-12 rounded-lg border mt-6"
            style={{
              backgroundColor: theme.bgPrimary,
              borderColor: theme.border,
            }}
          >
            <div className="mb-2" style={{ color: theme.textPrimary }}>
              No products match your filters
            </div>
            <button
              onClick={clearFilters}
              className="font-medium transition-colors duration-200"
              style={{ color: theme.accent }}
              onMouseOver={(e) => (e.target.style.color = theme.textPrimary)}
              onMouseOut={(e) => (e.target.style.color = theme.accent)}
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collections;
