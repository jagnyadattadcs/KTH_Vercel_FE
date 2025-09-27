import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import Collections from "./components/pages/Collections";
import ProductDetailPage from "./components/pages/ProductDetailPage";
import Home from "./components/Home";
import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import { SportsFooter } from "./components/shared/SportsFooter";
import NotFound from "./components/shared/NotFound";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/:type" element={<Collections />} />
          <Route path="/collections/:type/:category" element={<Collections />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* 404 Page - Catch all unmatched routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* <Footer /> */}
        <SportsFooter />
      </div>
    </ThemeProvider>
  );
}

export default App;
