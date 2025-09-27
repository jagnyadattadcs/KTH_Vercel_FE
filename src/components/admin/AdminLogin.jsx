import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LoginButton from "../ui/LoginButton";
import { useTheme } from "../../context/ThemeContext"; // Import the useTheme hook

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme(); // Get the current theme

  const navigate = useNavigate();

  // ✅ If already logged in → redirect to dashboard
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);

      // ✅ Fake login check
      if (email === "admin@kth.com" && password === "test123") {
        // Save token in localStorage
        localStorage.setItem("adminToken", "demo_admin_token_123");

        // Redirect to dashboard
        navigate("/admin/dashboard");
      } else {
        alert("Invalid email or password!");
      }
    }, 1500);
  };

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden" 
             style={{ backgroundColor: theme.bgPrimary }}>
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          src="/KTH.mp4"
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
        />
        <div className="absolute inset-0" style={{ backgroundColor: theme.bgPrimary, opacity: 0.8 }} />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-pink-500/20 to-purple-600/30 animate-gradient-xy mix-blend-overlay bg-[length:200%_200%]" />
      </div>

      {/* Login Form Container */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border"
             style={{ 
               backgroundColor: `${theme.bgSecondary}ee`,
               borderColor: `${theme.border}50`
             }}>
          {/* Form Header */}
          <div className="px-5 pt-5 pb-8 border-b" style={{ borderColor: theme.border }}>
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center"
                   style={{ backgroundColor: `${theme.accent}20` }}>
                <Lock className="h-8 w-8" style={{ color: theme.accent }} />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-center" style={{ color: theme.textPrimary }}>
              KTH SPORTS
            </h2>
            <p className="mt-2 text-center" style={{ color: theme.textSecondary }}>
              Admin Portal
            </p>
          </div>

          {/* Form Content */}
          <form className="px-10 pt-8 pb-10" onSubmit={handleSubmit}>
            <div className="space-y-5">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                  style={{ color: theme.textPrimary }}
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5" style={{ color: theme.textSecondary }} />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 transition-colors duration-200"
                    style={{ 
                      borderColor: theme.border,
                      backgroundColor: theme.bgPrimary,
                      color: theme.textPrimary
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = theme.accent;
                      e.target.style.boxShadow = `0 0 0 2px ${theme.accent}20`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = theme.border;
                      e.target.style.boxShadow = 'none';
                    }}
                    placeholder="admin@kthsports.com"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium"
                    style={{ color: theme.textPrimary }}
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-sm font-medium transition-colors duration-200"
                    style={{ color: theme.accent }}
                    onMouseOver={(e) => e.target.style.color = theme.textPrimary}
                    onMouseOut={(e) => e.target.style.color = theme.accent}
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5" style={{ color: theme.textSecondary }} />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 transition-colors duration-200"
                    style={{ 
                      borderColor: theme.border,
                      backgroundColor: theme.bgPrimary,
                      color: theme.textPrimary
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = theme.accent;
                      e.target.style.boxShadow = `0 0 0 2px ${theme.accent}20`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = theme.border;
                      e.target.style.boxShadow = 'none';
                    }}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ color: theme.textSecondary }}
                    onMouseOver={(e) => e.target.style.color = theme.textPrimary}
                    onMouseOut={(e) => e.target.style.color = theme.textSecondary}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 transition-colors duration-200" />
                    ) : (
                      <Eye className="h-5 w-5 transition-colors duration-200" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-4 w-4 border-gray-300 rounded focus:ring-0"
                  style={{ 
                    color: theme.accent,
                    borderColor: theme.border
                  }}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm"
                  style={{ color: theme.textPrimary }}
                >
                  Remember me
                </label>
              </div>

              {/* Submit Button */}
              <div>
                <LoginButton
                  type="submit"
                  disabled={isLoading}
                  isLoading={isLoading}
                  style={{ 
                    backgroundColor: theme.accent,
                    color: theme.textPrimary
                  }}
                >
                  Login
                </LoginButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;