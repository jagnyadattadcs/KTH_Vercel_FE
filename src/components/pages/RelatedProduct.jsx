import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "../../context/ThemeContext"; // Import the useTheme hook

const RelatedProduct = ({ relatedProducts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { theme } = useTheme(); // Get current theme

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (relatedProducts && currentIndex < relatedProducts.length - 3) 
      setCurrentIndex(currentIndex + 1);
  };

  // If no related products, don't render the component
  if (!relatedProducts || relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="px-6 py-8" style={{ backgroundColor: theme.bgPrimary }}>
      <h2 className="text-xl font-semibold mb-4" style={{ color: theme.textPrimary }}>
        You Might Also Like
      </h2>

      <div className="relative">
        {/* Products Container */}
        <div className="flex gap-6 overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * 300}px)` }}
          >
            {relatedProducts.map((product) => (
              <div key={product._id} className="min-w-[280px]">
                <div 
                  className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
                  style={{ backgroundColor: theme.bgSecondary }}
                >
                  <img
                    src={product.variants[0].images[0]}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <h3 className="mt-3 font-medium" style={{ color: theme.textPrimary }}>
                  {product.name}
                </h3>
                <p className="text-sm" style={{ color: theme.textSecondary }}>
                  {product.category}
                </p>
                <div className="mt-1">
                  <span className="font-semibold" style={{ color: theme.textPrimary }}>
                    ₹ {product.price.toLocaleString()}
                  </span>{" "}
                  {product.oldPrice && (
                    <span className="line-through ml-2" style={{ color: theme.textSecondary }}>
                      ₹ {product.oldPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Left Arrow */}
        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 p-2 rounded-full shadow transition-colors"
            style={{ backgroundColor: theme.bgSecondary }}
          >
            <ChevronLeft size={20} style={{ color: theme.textPrimary }} />
          </button>
        )}

        {/* Right Arrow */}
        {relatedProducts && currentIndex < relatedProducts.length - 3 && (
          <button
            onClick={handleNext}
            className="absolute -right-4 top-1/2 -translate-y-1/2 p-2 rounded-full shadow transition-colors"
            style={{ backgroundColor: theme.bgSecondary }}
          >
            <ChevronRight size={20} style={{ color: theme.textPrimary }} />
          </button>
        )}
      </div>
    </div>
  );
};

export default RelatedProduct;