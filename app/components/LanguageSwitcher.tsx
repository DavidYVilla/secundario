'use client'; // Este componente usa hooks de React

import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div>
      <p>Idioma actual: {language}</p>
      <button onClick={() => setLanguage('es')}>Cambiar a Español</button>
      <button onClick={() => setLanguage('en')}>Cambiar a Inglés</button>
    </div>
  );
};

export default LanguageSwitcher;
