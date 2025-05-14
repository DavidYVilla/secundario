'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { HiX, HiMenu } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';
import Flag from 'react-world-flags';
import { useTheme } from '../contexts/ThemeContext';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <>
      {/* Barra de progreso del scroll */}
      <div
        style={{
          width: `${scrollProgress}%`,
          height: '5px',
          backgroundColor: 'yellow',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1000,
        }}
      />
      {/* Menú de navegación */}
      <nav className="bg-primary text-white p-4 sticky top-0 z-50 shadow-md dark:bg-gray-800">
        <div className="container mx-auto flex items-center justify-between">
          {/* Título resaltado a la izquierda */}
          <h1 className="text-xl font-bold hidden md:block">
            {t('menu.title')}
          </h1>
          {/* Botón de hamburguesa y menú en pantalla pequeña */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white hover:text-secondary"
            >
              {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>

          {/* Opciones del menú: Ocultas en dispositivos pequeños */}
          <ul
            className={`absolute top-16 left-0 w-full bg-primary text-center space-y-4 py-4 md:relative md:flex md:space-x-6 md:space-y-0 md:top-0 md:w-auto md:bg-transparent dark:bg-gray-800 
            ${menuOpen ? 'block' : 'hidden'}`}
          >
            <li>
              <Link href="/" className="hover:underline">
                {t('menu.home')}
              </Link>
            </li>
            <li>
              <Link href="/#about" className="hover:underline">
                {t('menu.about')}
              </Link>
            </li>
            <li>
              <Link href="/#skills" className="hover:underline">
                {t('menu.skills')}
              </Link>
            </li>
            <li>
              <Link href="/#projects" className="hover:underline">
                {t('menu.projects')}
              </Link>
            </li>
            <li>
              <Link href="/pages/blog" className="hover:underline">
                {t('menu.blog')}
              </Link>
            </li>
            <li>
              <Link href="/#contact" className="hover:underline">
                {t('menu.contact')}
              </Link>
            </li>
          </ul>
          {/* Redes sociales a la dereccha */}
          <div className="flex space-x-4">
            <button
              onClick={toggleTheme}
              className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>
            <div className="flex items-center">
              {/* Botón para cambiar a Inglés */}
              {i18n.language !== 'en' && (
                <button
                  onClick={() => i18n.changeLanguage('en')} // 🔥 Ahora usa `changeLanguage`
                  className="flex items-center space-x-2 bg-secondary text-white py-2 px-4 rounded-lg hover:bg-accent transition"
                >
                  <Flag code="US" className="w-6 h-6" />
                </button>
              )}
              {/* Botón para cambiar a Español */}
              {i18n.language !== 'es' && (
                <button
                  onClick={() => i18n.changeLanguage('es')} // 🔥 Ahora usa `changeLanguage`
                  className="flex items-center space-x-2 bg-secondary text-white py-2 px-4 rounded-lg hover:bg-accent transition"
                >
                  <Flag code="ES" className="w-6 h-6" />
                </button>
              )}
            </div>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook
                className="text-white hover:text-secondary"
                size={24}
              />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter
                className="text-white hover:text-secondary"
                size={24}
              />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin
                className="text-white hover:text-secondary"
                size={24}
              />
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
