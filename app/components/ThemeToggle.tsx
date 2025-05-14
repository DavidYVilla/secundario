'use client';

import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme(); // ✅ Accede a `toggleTheme`

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 bg-gray-800 text-white rounded"
    >
      Cambiar a {theme === 'light' ? 'Modo Oscuro' : 'Modo Claro'}
    </button>
  );
};

export default ThemeToggle;
