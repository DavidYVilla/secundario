'use client';

import { useTheme } from '../contexts/ThemeContext';

export default function TestTheme() {
  const { theme } = useTheme();

  return (
    <div
      className={`p-6 bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-700`}
    >
      <p
        className={
          theme === 'dark'
            ? 'bg-gray-800 text-white p-4 rounded'
            : 'bg-white text-black p-4 rounded'
        }
      >
        Este texto debe cambiar en modo oscuro
      </p>
    </div>
  );
}
