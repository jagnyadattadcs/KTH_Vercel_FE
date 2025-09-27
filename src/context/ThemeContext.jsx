// File: context/ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Define your color themes
export const themes = {
  default: {
    name: 'Default',
    bgPrimary: '#111827',
    bgSecondary: '#1f2937',
    textPrimary: '#ffffff',
    textSecondary: '#d1d5db',
    accent: '#FF8C00',
    border: '#FF8C00',
    className: 'bg-[#111827] text-white border-[#FF8C00]'
  },
  light: {
    name: 'Light',
    bgPrimary: '#ffffff',
    bgSecondary: '#f3f4f6',
    textPrimary: '#111827',
    textSecondary: '#4b5563',
    accent: '#3b82f6',
    border: '#d1d5db',
    className: 'bg-white text-gray-900 border-gray-300'
  },
  blue: {
    name: 'Blue',
    bgPrimary: '#dbeafe',
    bgSecondary: '#bfdbfe',
    textPrimary: '#1e3a8a',
    textSecondary: '#3b82f6',
    accent: '#1d4ed8',
    border: '#3b82f6',
    className: 'bg-blue-100 text-blue-900 border-blue-500'
  },
  dark: {
    name: 'Dark',
    bgPrimary: '#000000',
    bgSecondary: '#1a1a1a',
    textPrimary: '#ffffff',
    textSecondary: '#a1a1a1',
    accent: '#dc2626',
    border: '#dc2626',
    className: 'bg-black text-white border-red-600'
  },
  green: {
    name: 'Green',
    bgPrimary: '#dcfce7',
    bgSecondary: '#bbf7d0',
    textPrimary: '#166534',
    textSecondary: '#22c55e',
    accent: '#16a34a',
    border: '#22c55e',
    className: 'bg-green-100 text-green-900 border-green-500'
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('default');

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
      localStorage.setItem('theme', themeName);
    }
  };

  const value = {
    theme: themes[currentTheme],
    themeName: currentTheme,
    changeTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      <div className={`min-h-screen transition-colors duration-300 ${themes[currentTheme].className}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};