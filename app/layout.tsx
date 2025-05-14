'use client';

import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n';
import './styles/globals.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gradient-to-r from-primary to-accent dark:from-gray-900 dark:to-gray-600 text-gray-900 dark:text-white transition-all duration-300">
        <I18nextProvider i18n={i18n}>
          <LanguageProvider>
            <ThemeProvider>
              <Navbar />
              <main className="flex-group">{children}</main>
              <Footer />
            </ThemeProvider>
          </LanguageProvider>
        </I18nextProvider>
      </body>
    </html>
  );
}
