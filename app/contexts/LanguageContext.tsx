'use client'; // 🚀 Evita errores con `createContext`

import React, { createContext, useContext, useState, ReactNode } from 'react';

const LanguageContext = createContext<{
  language: string;
  setLanguage: (lang: string) => void;
} | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState('es');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage debe usarse dentro de un LanguageProvider');
  }
  return context;
};

export { LanguageContext }; // ✅ Exportación nombrada correcta
