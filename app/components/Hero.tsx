'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  const { t } = useTranslation(); //para acceder a las traducciones
  return (
    <section
      id="hero"
      className="relative bg-gradient-to-r from-primary to-accent min-h-[60vh] flex items-center justify-center"
    >
      {/* Imagen de fondo con superposición oscura */}

      <div className="absolute inset-0 bg-black bg-opacity-70">
        <Image
          src="/imagenes/fondo1.png"
          alt="fondo"
          fill
          priority
          className="object-cover w-full h-full" // ✅ Ocupa todo el espacio y elimina bordes redondeados
        />
      </div>
      {/* Contenido Hero con caja semitransparente */}
      <div className="relative px-6 py-12 bg-black bg-opacity-60 rounded-lg shadow-lg max-w-3xl text-center">
        {/* Título principal */}
        <h2 className="text-3xl md:text-5xl font-bold text-yellow-300 mb-4 tracking-wide drop-shadow-lg">
          {t('hero.title')}
        </h2>
        {/* Nombre destacado */}
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-white leading-tight drop-shadow-lg">
          David Y. <span className="text-yellow-400">Villa Durán</span>
        </h1>
        {/* Subtítulo */}
        <h2 className="text-lg md:text-2xl font-light text-gray-200 mb-6">
          {t('hero.subt1')}{' '}
          <span className="font-medium">{t('hero.subt2')}</span>
        </h2>
        {/* Descripción */}
        <p className="text-md md:text-lg text-gray-300 mb-10">
          {t('hero.text')}
        </p>
        {/* Botón */}
        <Link
          href="#projects"
          className="bg-white text-primary px-8 py-3 rounded-lg shadow-md hover:bg-secondary hover:text-white transition-all duration-300"
        >
          {t('hero.buton')}
        </Link>
      </div>
    </section>
  );
}
