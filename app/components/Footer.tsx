'use client';

import { useTranslation } from 'react-i18next';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Footer() {
  const { t } = useTranslation(); //para acceder a las traducciones
  return (
    <footer className="bg-primary text-white py-8 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        {/* Navegación del Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Sección de navegación */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('menu.navigation')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="/#" className="hover:text-secondary">
                  {t('menu.home')}
                </a>
              </li>
              <li>
                <a href="/#about" className="hover:text-secondary">
                  {t('menu.about')}
                </a>
              </li>
              <li>
                <a href="/#skills" className="hover:text-secondary">
                  {t('menu.skills')}
                </a>
              </li>
              <li>
                <a href="/#projects" className="hover:text-secondary">
                  {t('menu.projects')}
                </a>
              </li>
              <li>
                <a href="/#contact" className="hover:text-secondary">
                  {t('menu.contact')}
                </a>
              </li>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('menu.conect')}</h3>
            <ul className="flex space-x-6">
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=61576240820775"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-secondary"
                >
                  <FaFacebook size={32} />
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/davidvilladuran"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-secondary"
                >
                  <FaTwitter size={32} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/david-villa-9a40ba2ab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-secondary"
                >
                  <FaLinkedin size={32} />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/DavidYVilla/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-secondary"
                >
                  <FaGithub size={32} />
                </a>
              </li>
            </ul>
          </div>

          {/* Información de Contacto */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('menu.contactme')}</h3>
            <p className="text-neutral">
              Email:{' '}
              <a
                href="mailto:dvilladuran@gmail.com"
                className="hover:text-secondary"
              >
                dvilladuran@gmail.com
              </a>
            </p>
            <p className="text-neutral">
              {t('menu.phone')}:{' '}
              <a href="tel:+59173686405" className="hover:text-secondary">
                +591 736 86405
              </a>
            </p>
          </div>
        </div>

        {/* Derechos Reservados */}
        <div className="text-center text-neutral border-t border-neutral/30 pt-4">
          © 2025 David Y. Villa Durán. {t('menu.derechos')}
        </div>
      </div>
    </footer>
  );
}
