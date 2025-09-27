import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme, themes } from "../../context/ThemeContext";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [clickedDropdown, setClickedDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  const { theme, changeTheme } = useTheme();

  const toggleDropdown = (dropdown) => {
    setClickedDropdown(true);

    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
      setActiveTab(dropdown);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleDropdownItemClick = (category, item) => {
    setBreadcrumbs([{ category, item }]);
    setActiveDropdown(null);
    setActiveTab(category);
    setMobileMenuOpen(false);
  };

  const clearBreadcrumbs = () => {
    setBreadcrumbs([]);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container") && clickedDropdown) {
        setActiveDropdown(null);
        setClickedDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [clickedDropdown]);

  const navItems = [
    {
      name: "MEN",
      dropdown: [
        { name: "T-Shirts", href: "/collections/men/tshirts" },
        { name: "Jeans", href: "/collections/men/jeans" },
        { name: "Shoes", href: "/collections/men/shoes" },
        { name: "Accessories", href: "/collections/men/accessories" },
      ],
    },
    {
      name: "WOMEN",
      dropdown: [
        { name: "Dresses", href: "/collections/women/dresses" },
        { name: "Tops", href: "/collections/women/tops" },
        { name: "Skirts", href: "/collections/women/skirts" },
        { name: "Handbags", href: "/collections/women/handbags" },
      ],
    },
    {
      name: "KIDS",
      dropdown: [
        { name: "Boys Clothing", href: "/collections/kids/boys" },
        { name: "Girls Clothing", href: "/collections/kids/girls" },
        { name: "Toys", href: "/collections/kids/toys" },
        { name: "Shoes", href: "/collections/kids/shoes" },
      ],
    },
    {
      name: "UNISEX",
      dropdown: [
        { name: "Hoodies", href: "/collections/unisex/hoodies" },
        { name: "Sneakers", href: "/collections/unisex/sneakers" },
        { name: "Caps", href: "/collections/unisex/caps" },
        { name: "Watches", href: "/collections/unisex/watches" },
      ],
    },
  ];

  return (
    <>
      <nav
        className={`backdrop-blur-md border-b sticky top-0 z-50 ${theme.className}`}
      >
        <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img src="/KTH_Logo.png" alt="logo" className="w-15 h-10" />
            </Link>

            {/* Search Box - Hidden on mobile */}
            <div className="hidden sm:flex flex-1 max-w-sm mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className={`w-80 px-1 py-1 sm:px-4 sm:py-2 pr-4 rounded-md border focus:outline-none focus:ring-2 focus:border-transparent backdrop-blur-sm ${
                    theme.name === "default"
                      ? "border-gray-600 focus:ring-[#FF8C00] bg-[#1f2937] text-white"
                      : ""
                  }`}
                  style={
                    theme.name !== "default"
                      ? {
                          borderColor: theme.border,
                          backgroundColor: theme.bgSecondary,
                          color: theme.textPrimary,
                          "--tw-ring-color": theme.accent,
                        }
                      : {}
                  }
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    style={
                      theme.name !== "default"
                        ? {
                            color: theme.textSecondary,
                          }
                        : {}
                    }
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Desktop Navigation Tabs - Show on lg screens and above */}
            <div className="hidden lg:flex space-x-6 dropdown-container">
              {navItems.map((item, index) => (
                <div key={index} className="relative group">
                  <button
                    className={`flex items-center font-medium transition-colors cursor-pointer
                    ${
                      activeTab === item.name
                        ? `text-[${theme.accent}]`
                        : `text-${theme.textPrimary.replace(
                            "#",
                            ""
                          )} hover:text-[${theme.accent}]`
                    }`}
                    onClick={() => toggleDropdown(item.name)}
                    style={{
                      color:
                        activeTab === item.name
                          ? theme.accent
                          : theme.textPrimary,
                    }}
                  >
                    {item.name}
                    <svg
                      className={`h-4 w-4 ml-1 transition-opacity ${
                        activeDropdown === item.name
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ color: theme.accent }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {activeDropdown === item.name && (
                    <div
                      className="absolute top-full -left-30 mt-4 w-80 backdrop-blur-lg rounded-sm shadow-lg py-2 z-50 border"
                      style={{
                        backgroundColor: theme.bgSecondary,
                        borderColor: theme.border,
                      }}
                    >
                      <h2
                        className="text-center font-bold mb-2"
                        style={{ color: theme.accent }}
                      >
                        {item.name} COLLECTIONS
                      </h2>
                      {item.dropdown.map((link, linkIndex) => (
                        <Link
                          key={linkIndex}
                          to={link.href}
                          className="block px-4 py-2 text-sm text-center font-semibold transition-colors"
                          style={{
                            color: theme.textSecondary,
                            backgroundColor: "transparent",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.color = "#ffffff";
                            e.target.style.backgroundColor = theme.accent;
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.color = theme.textSecondary;
                            e.target.style.backgroundColor = "transparent";
                          }}
                          onClick={() =>
                            handleDropdownItemClick(item.name, link.name)
                          }
                        >
                          {item.name} {link.name.toUpperCase()}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Theme Switcher */}
            <div className="relative dropdown-container ml-4">
              <button
                onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                className="p-2 rounded-md hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{
                  backgroundColor: `${theme.accent}20`,
                  color: theme.textPrimary,
                }}
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 01-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {themeDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-50"
                  style={{
                    backgroundColor: theme.bgSecondary,
                    border: `1px solid ${theme.border}`,
                  }}
                >
                  <div
                    className="px-4 py-2 border-b"
                    style={{ borderColor: theme.border }}
                  >
                    <span
                      className="text-sm font-medium"
                      style={{ color: theme.textPrimary }}
                    >
                      Theme
                    </span>
                  </div>
                  {Object.entries(themes).map(([key, themeObj]) => (
                    <button
                      key={key}
                      onClick={() => {
                        changeTheme(key);
                        setThemeDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm hover:opacity-80 transition-opacity"
                      style={{
                        color: themeObj.textPrimary,
                        backgroundColor:
                          key === theme.name
                            ? `${themeObj.accent}30`
                            : "transparent",
                      }}
                    >
                      {themeObj.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile menu button - Show on screens smaller than lg */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{
                  color: theme.textPrimary,
                  backgroundColor: `${theme.accent}20`,
                }}
              >
                {mobileMenuOpen ? (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                )}
              </button>
            </div>

            {/* Profile Icon - Hidden on mobile */}
            <Link to="/admin/login" className="hidden lg:flex flex-shrink-0">
              <button
                className="p-1 rounded-full cursor-pointer focus:outline-none ring-2"
                style={{
                  color: theme.textPrimary,
                  backgroundColor: "transparent",
                  borderColor: theme.textSecondary,
                }}
              >
                <svg
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
              </button>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Menu - Show on screens smaller than lg */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden backdrop-blur-md border-t"
            style={{
              backgroundColor: theme.bgSecondary,
              borderColor: theme.border,
            }}
          >
            {/* Mobile Search Box */}
            <div className="px-4 pt-3 pb-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className={`w-full px-4 py-2 pr-4 rounded-md border focus:outline-none focus:ring-2 focus:border-transparent backdrop-blur-sm ${
                    theme.name === "default"
                      ? "border-gray-600 focus:ring-[#FF8C00] bg-[#1f2937] text-white"
                      : ""
                  }`}
                  style={
                    theme.name !== "default"
                      ? {
                          borderColor: theme.border,
                          backgroundColor: theme.bgSecondary,
                          color: theme.textPrimary,
                          "--tw-ring-color": theme.accent,
                        }
                      : {}
                  }
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    style={
                      theme.name !== "default"
                        ? {
                            color: theme.textSecondary,
                          }
                        : {}
                    }
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Mobile Navigation Items */}
            <div className="px-2 pt-2 pb-3 space-y-1 dropdown-container">
              {navItems.map((item, index) => (
                <div key={index} className="relative">
                  <button
                    className={`w-full flex items-center justify-between px-3 py-2 font-medium rounded-md ${
                      activeDropdown === item.name ? "bg-opacity-20" : ""
                    }`}
                    style={{
                      color:
                        activeDropdown === item.name
                          ? theme.accent
                          : theme.textPrimary,
                      backgroundColor:
                        activeDropdown === item.name
                          ? `${theme.accent}20`
                          : "transparent",
                    }}
                    onClick={() => toggleDropdown(item.name)}
                  >
                    <span>{item.name}</span>
                    <svg
                      className={`h-4 w-4 transition-transform ${
                        activeDropdown === item.name ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ color: theme.accent }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>

                  {/* Mobile Dropdown Menu */}
                  {activeDropdown === item.name && (
                    <div
                      className="mt-1 pl-4 rounded-md"
                      style={{ backgroundColor: `${theme.bgPrimary}90` }}
                    >
                      <h2
                        className="font-bold py-2 px-3"
                        style={{ color: theme.accent }}
                      >
                        {item.name} COLLECTIONS
                      </h2>
                      {item.dropdown.map((link, linkIndex) => (
                        <Link
                          key={linkIndex}
                          to={link.href}
                          className="block px-3 py-2 text-sm rounded-md transition-colors"
                          style={{
                            color: theme.textSecondary,
                            backgroundColor: "transparent",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.color = "#ffffff";
                            e.target.style.backgroundColor = theme.accent;
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.color = theme.textSecondary;
                            e.target.style.backgroundColor = "transparent";
                          }}
                          onClick={() => {
                            handleDropdownItemClick(item.name, link.name);
                          }}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <div
          className="py-2 px-4 border-b"
          style={{
            backgroundColor: theme.bgPrimary,
            borderColor: theme.border,
            color: theme.textPrimary,
          }}
        >
          <div className="max-w-7xl mx-auto flex items-center text-sm">
            <Link
              to="/"
              className="cursor-pointer transition-colors mr-1"
              style={{ color: theme.textPrimary }}
              onMouseEnter={(e) => (e.target.style.color = theme.accent)}
              onMouseLeave={(e) => (e.target.style.color = theme.textPrimary)}
              onClick={clearBreadcrumbs}
            >
              Home
            </Link>
            {breadcrumbs.map((breadcrumb, index) => (
              <span key={index} className="flex items-center">
                <span className="mx-1" style={{ color: theme.textSecondary }}>
                  /
                </span>
                <span
                  className="cursor-pointer transition-colors"
                  style={{ color: theme.textPrimary }}
                  onMouseEnter={(e) => (e.target.style.color = theme.accent)}
                  onMouseLeave={(e) =>
                    (e.target.style.color = theme.textPrimary)
                  }
                >
                  {breadcrumb.category}
                </span>
                <span className="mx-1" style={{ color: theme.textSecondary }}>
                  /
                </span>
                <span className="font-bold" style={{ color: theme.accent }}>
                  {breadcrumb.item}
                </span>
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;