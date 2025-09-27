import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Phone,
} from "lucide-react";
import RelatedProduct from "./RelatedProduct";
import { useProductContext } from "../../context/ProductContext";
import { useTheme } from "../../context/ThemeContext";
import { useOrderContext } from "../../context/OrderContext"; // Import OrderContext

const Accordion = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <div className="border-t py-3" style={{ borderColor: theme.border }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center font-medium text-left"
        style={{ color: theme.textPrimary }}
      >
        {title}
        {open ? (
          <ChevronUp size={18} style={{ color: theme.accent }} />
        ) : (
          <ChevronDown size={18} style={{ color: theme.accent }} />
        )}
      </button>
      {open && (
        <div className="mt-2 text-sm" style={{ color: theme.textSecondary }}>
          {children}
        </div>
      )}
    </div>
  );
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const {
    products,
    fetchProductById,
    getProductById,
    loading: productLoading,
  } = useProductContext();
  const { theme } = useTheme();
  const {
    addOrder,
    loading: orderLoading,
    error: orderError,
    clearError,
  } = useOrderContext(); // Use OrderContext

  const [product, setProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: "",
    email: "",
    phone: "",
    deliveryAddress: "",
    quantity: 30,
    description: "",
  });
  const [formErrors, setFormErrors] = useState({});

  // ✅ fetch product from context or backend
  useEffect(() => {
    const loadProduct = async () => {
      const existing = getProductById(id);
      if (existing) {
        setProduct(existing);
      } else {
        const fetched = await fetchProductById(id);
        if (fetched) setProduct(fetched);
      }
    };
    loadProduct();
  }, [id, products]);

  // ✅ related products
  useEffect(() => {
    if (product) {
      const related = products
        .filter(
          (p) =>
            p._id !== product._id &&
            (p.category === product.category || p.brand === product.brand)
        )
        .slice(0, 4);
      setRelatedProducts(related);
    }
  }, [product, products]);

  // ✅ Clear errors when modal closes
  useEffect(() => {
    if (!showOrderForm) {
      clearError();
      setFormErrors({});
      setOrderForm({
        name: "",
        email: "",
        phone: "",
        deliveryAddress: "",
        quantity: 30,
        description: "",
      });
    }
  }, [showOrderForm, clearError]);

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!orderForm.name.trim()) errors.name = "Name is required";
    if (!orderForm.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(orderForm.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!orderForm.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (orderForm.phone.length < 10) {
      errors.phone = "Please enter a valid phone number";
    }
    if (!orderForm.deliveryAddress.trim())
      errors.deliveryAddress = "Delivery address is required";
    if (!orderForm.quantity || orderForm.quantity < 30)
      errors.quantity = "Minimum quantity is 30";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleOrderFormChange = (e) => {
    const { name, value } = e.target;
    setOrderForm((prev) => ({
      ...prev,
      [name]: name === "quantity" ? parseInt(value) || 30 : value,
    }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const orderData = {
        ...orderForm,
        productId: product._id,
        productName: product.name,
        productBrand: product.brand,
        productVariant: product.variants[selectedVariant].color,
        productSize: selectedSize,
        productPrice: product.price,
        totalAmount: product.price * orderForm.quantity,
      };

      const result = await addOrder(orderData);

      if (result.success) {
        alert("Order request submitted successfully!");
        setShowOrderForm(false);
        setOrderForm({
          name: "",
          email: "",
          phone: "",
          deliveryAddress: "",
          quantity: 30,
          description: "",
        });
      }
    } catch (error) {
      console.error("Failed to submit order:", error);
      // Error is already handled by the context
    }
  };

  if (productLoading && !product) {
    return (
      <div className="p-6" style={{ color: theme.textPrimary }}>
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6" style={{ color: theme.textPrimary }}>
        Product not found.
      </div>
    );
  }

  const currentVariant = product.variants[selectedVariant];
  const images = currentVariant.images;

  const handleThumbnailClick = (index) => setCurrentIndex(index);
  const handlePrev = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const handleNext = () =>
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  const handleVariantSelect = (index) => setSelectedVariant(index);
  const handleSizeSelect = (size) => setSelectedSize(size);

  return (
    <>
      {/* ✅ Order Form Modal */}
      {showOrderForm && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div
            className="rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: theme.bgSecondary }}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2
                  className="text-xl font-bold"
                  style={{ color: theme.accent }}
                >
                  Order Form - {product.name}
                </h2>
                <button
                  onClick={() => setShowOrderForm(false)}
                  className="text-3xl"
                  style={{ color: theme.textSecondary }}
                >
                  &times;
                </button>
              </div>

              {/* Order Error Message */}
              {orderError && (
                <div className="mb-4 p-3 rounded-md bg-red-100 border border-red-400">
                  <p className="text-red-700">{orderError}</p>
                </div>
              )}

              <form onSubmit={handleOrderSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      style={{ color: theme.textSecondary }}
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={orderForm.name}
                      onChange={handleOrderFormChange}
                      required
                      className={`w-full rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                        formErrors.name ? "border-red-500" : ""
                      }`}
                      style={{
                        backgroundColor: theme.bgPrimary,
                        borderColor: formErrors.name ? "#ef4444" : theme.border,
                        color: theme.textPrimary,
                      }}
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-xs mt-1">
                        {formErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      style={{ color: theme.textSecondary }}
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={orderForm.email}
                      onChange={handleOrderFormChange}
                      required
                      className={`w-full rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                        formErrors.email ? "border-red-500" : ""
                      }`}
                      style={{
                        backgroundColor: theme.bgPrimary,
                        borderColor: formErrors.email
                          ? "#ef4444"
                          : theme.border,
                        color: theme.textPrimary,
                      }}
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {formErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      style={{ color: theme.textSecondary }}
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={orderForm.phone}
                      onChange={handleOrderFormChange}
                      required
                      className={`w-full rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                        formErrors.phone ? "border-red-500" : ""
                      }`}
                      style={{
                        backgroundColor: theme.bgPrimary,
                        borderColor: formErrors.phone
                          ? "#ef4444"
                          : theme.border,
                        color: theme.textPrimary,
                      }}
                    />
                    {formErrors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {formErrors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      style={{ color: theme.textSecondary }}
                    >
                      Quantity (Minimum 30) *
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={orderForm.quantity}
                      onChange={handleOrderFormChange}
                      min="30"
                      required
                      className={`w-full rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                        formErrors.quantity ? "border-red-500" : ""
                      }`}
                      style={{
                        backgroundColor: theme.bgPrimary,
                        borderColor: formErrors.quantity
                          ? "#ef4444"
                          : theme.border,
                        color: theme.textPrimary,
                      }}
                    />
                    {formErrors.quantity && (
                      <p className="text-red-500 text-xs mt-1">
                        {formErrors.quantity}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: theme.textSecondary }}
                  >
                    Delivery Address *
                  </label>
                  <textarea
                    name="deliveryAddress"
                    value={orderForm.deliveryAddress}
                    onChange={handleOrderFormChange}
                    required
                    rows="3"
                    className={`w-full rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                      formErrors.deliveryAddress ? "border-red-500" : ""
                    }`}
                    style={{
                      backgroundColor: theme.bgPrimary,
                      borderColor: formErrors.deliveryAddress
                        ? "#ef4444"
                        : theme.border,
                      color: theme.textPrimary,
                    }}
                  ></textarea>
                  {formErrors.deliveryAddress && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.deliveryAddress}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: theme.textSecondary }}
                  >
                    Additional Description (Optional)
                  </label>
                  <textarea
                    name="description"
                    value={orderForm.description}
                    onChange={handleOrderFormChange}
                    rows="3"
                    className="w-full rounded-md px-3 py-2 focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: theme.bgPrimary,
                      borderColor: theme.border,
                      color: theme.textPrimary,
                    }}
                    placeholder="Any special instructions or requirements..."
                  ></textarea>
                </div>

                {/* Order Summary */}
                <div
                  className="p-4 rounded-md"
                  style={{
                    backgroundColor: theme.bgPrimary,
                    borderColor: theme.border,
                  }}
                >
                  <h4
                    className="font-semibold mb-2"
                    style={{ color: theme.textPrimary }}
                  >
                    Order Summary
                  </h4>
                  <div className="space-y-1 text-sm">
                    <p style={{ color: theme.textSecondary }}>
                      Product: {product.name}
                    </p>
                    <p style={{ color: theme.textSecondary }}>
                      Color: {currentVariant.color}
                    </p>
                    <p style={{ color: theme.textSecondary }}>
                      Size: {selectedSize || "Not selected"}
                    </p>
                    <p style={{ color: theme.textSecondary }}>
                      Quantity: {orderForm.quantity}
                    </p>
                    <p style={{ color: theme.textSecondary }}>
                      Price per piece: ₹{product.price.toLocaleString()}
                    </p>
                    <p
                      className="font-semibold"
                      style={{ color: theme.accent }}
                    >
                      Total: ₹
                      {(product.price * orderForm.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={orderLoading}
                    className="w-full py-3 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: theme.accent,
                      color: theme.textPrimary,
                    }}
                  >
                    {orderLoading ? "Submitting..." : "Submit Order Request"}
                  </button>
                </div>
              </form>

              {/* Direct Contact Section */}
              <div
                className="mt-6 p-4 rounded-md"
                style={{ backgroundColor: theme.bgPrimary }}
              >
                <h3
                  className="text-lg font-semibold mb-3 flex items-center"
                  style={{ color: theme.textPrimary }}
                >
                  <Phone
                    size={20}
                    className="mr-2"
                    style={{ color: theme.accent }}
                  />
                  Prefer to order directly?
                </h3>
                <p className="mb-2" style={{ color: theme.textSecondary }}>
                  Call us for immediate assistance:
                </p>
                <a
                  href="tel:+911234567890"
                  className="text-2xl font-bold block mb-2 hover:opacity-80 transition-opacity"
                  style={{ color: theme.accent }}
                >
                  +91 123 456 7890
                </a>
                <p className="text-sm" style={{ color: theme.textSecondary }}>
                  Available 24/7 for your convenience
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Product Detail UI */}
      <div
        className="flex flex-col md:flex-row gap-8 p-6 min-h-screen"
        style={{ backgroundColor: theme.bgPrimary }}
      >
        {/* Left - Images */}
        <div className="flex gap-4 w-full md:w-1/2 md:sticky md:top-6 self-start h-fit">
          <div className="flex flex-col gap-2">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx}`}
                className={`w-20 h-20 object-cover rounded cursor-pointer border ${
                  idx === currentIndex ? "border-[#FF8C00]" : "border-gray-700"
                }`}
                onClick={() => handleThumbnailClick(idx)}
                style={{
                  borderColor:
                    idx === currentIndex ? theme.accent : theme.border,
                }}
              />
            ))}
          </div>

          <div className="relative flex-1 flex items-center justify-center">
            <img
              src={images[currentIndex]}
              alt={product.name}
              className="w-full h-[500px] object-cover rounded-md"
            />
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full shadow transition-colors"
              style={{ backgroundColor: theme.bgSecondary }}
            >
              <ChevronLeft size={20} style={{ color: theme.textPrimary }} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full shadow transition-colors"
              style={{ backgroundColor: theme.bgSecondary }}
            >
              <ChevronRight size={20} style={{ color: theme.textPrimary }} />
            </button>
          </div>
        </div>

        {/* Right - Details */}
        <div className="w-full md:w-1/2 space-y-6 overflow-y-auto">
          <div>
            <h2
              className="text-xl font-semibold"
              style={{ color: theme.accent }}
            >
              {product.brand}
            </h2>
            <h1
              className="text-2xl font-bold"
              style={{ color: theme.textPrimary }}
            >
              {product.name}
            </h1>
            <p
              className="mt-2 text-lg font-semibold"
              style={{ color: theme.textPrimary }}
            >
              MRP : ₹ {product.price.toLocaleString()}
            </p>
            <p className="text-sm" style={{ color: theme.textSecondary }}>
              Inclusive of all taxes
            </p>
          </div>

          {/* Variants */}
          <div>
            <h3
              className="font-medium mb-2"
              style={{ color: theme.textPrimary }}
            >
              Color: {currentVariant.color}
            </h3>
            <div className="flex gap-3">
              {product.variants.map((variant, idx) => (
                <img
                  key={idx}
                  src={variant.images[0]}
                  alt={variant.color}
                  className={`w-16 h-16 object-cover rounded cursor-pointer border hover:border-[#FF8C00]`}
                  style={{
                    borderColor:
                      idx === selectedVariant ? theme.accent : theme.border,
                  }}
                  onClick={() => handleVariantSelect(idx)}
                />
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h3
              className="font-medium mb-2"
              style={{ color: theme.textPrimary }}
            >
              Select Size
            </h3>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeSelect(size)}
                  disabled={!product.availableSizes.includes(size)}
                  className={`px-4 py-2 border rounded ${
                    selectedSize === size
                      ? "text-[#FF8C00]"
                      : product.availableSizes.includes(size)
                      ? "hover:border-[#FF8C00]"
                      : "cursor-not-allowed"
                  }`}
                  style={{
                    borderColor:
                      selectedSize === size ? theme.accent : theme.border,
                    backgroundColor:
                      selectedSize === size
                        ? `${theme.accent}10`
                        : "transparent",
                    color:
                      selectedSize === size
                        ? theme.accent
                        : product.availableSizes.includes(size)
                        ? theme.textPrimary
                        : theme.textSecondary,
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Stock */}
          <div className="text-sm">
            {product.inStock ? (
              <p style={{ color: theme.accent }}>In Stock</p>
            ) : (
              <p style={{ color: theme.accent }}>Out of Stock</p>
            )}
          </div>

          {/* Order Button */}
          <div className="pt-4">
            <h3
              className="text-lg font-semibold mb-3"
              style={{ color: theme.accent }}
            >
              You Want To Buy?
            </h3>
            <button
              onClick={() => setShowOrderForm(true)}
              className="w-full py-3 rounded-md font-medium transition-colors"
              style={{
                backgroundColor: theme.accent,
                color: theme.textPrimary,
              }}
            >
              Fill Order Form
            </button>
          </div>

          {/* Accordions */}
          <div className="divide-y" style={{ borderColor: theme.border }}>
            <Accordion title="View Product Details">
              <p style={{ color: theme.textSecondary }}>
                {product.description}
              </p>
            </Accordion>
            <Accordion title="Size & Fit">
              <ul
                className="list-disc ml-5"
                style={{ color: theme.textSecondary }}
              >
                <li>Standard fit</li>
                <li>Check size guide for details</li>
              </ul>
            </Accordion>
            <Accordion title="Delivery & Returns">
              <p style={{ color: theme.textSecondary }}>
                Free standard delivery and returns within 14 days.
              </p>
            </Accordion>
            <Accordion title="Reviews (0)">
              <p style={{ color: theme.textSecondary }}>No reviews yet.</p>
            </Accordion>
          </div>
        </div>
      </div>

      {/* Related */}
      <RelatedProduct relatedProducts={relatedProducts} />
    </>
  );
};

export default ProductDetailPage;
