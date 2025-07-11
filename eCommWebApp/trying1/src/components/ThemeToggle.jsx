import React from 'react';
import { useTheme } from '../context/ThemeContext.jsx';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200
                 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
    >
      {theme === 'light' ? '☀️ Light Theme' : '🌙 Dark Theme'}
    </button>
  );
}

export default ThemeToggle;