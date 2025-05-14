'use client';

import { useTranslation } from 'react-i18next';
import Image from 'next/image';

export default function About() {
  const { t } = useTranslation();

  return (
    <section
      id="about"
      className="container mx-auto py-16 px-6 flex flex-col md:flex-row items-center bg-primary dark:bg-gray-900 text-gray-900 dark:text-white"
    >
      {/* Imagen */}
      <div className="flex-shrink-0 w-full md:w-1/3 mb-6 md:mb-0">
        <Image
          src="/imagenes/portada.png"
          alt="Fotografía de David Y. Villa Durán"
          width={224} // Equivale a Tailwind `w-56`
          height={224}
          priority
          className="rounded-full shadow-lg w-56 md:w-64 mx-auto dark:hidden"
        />
        <Image
          src="/imagenes/portada2.png"
          alt="Fotografía de David Y. Villa Durán"
          width={224} // Equivale a Tailwind `w-56`
          height={224}
          className="rounded-full shadow-lg w-56 md:w-64 mx-auto hidden dark:block"
        />
      </div>
      {/* Contenido */}
      <div className="md:ml-8 text-center md:text-left">
        <h2 className="text-3xl font-bold text-yellow-300 dark:text-yellow-400 mb-4 drop-shadow">
          {t('about.title')}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg">
          {t('about.text1')}
        </p>
        <a
          href="/pages/about"
          className="text-yellow-500 dark:text-yellow-400 hover:underline mt-2 block"
        >
          {t('about.see_more')}
        </a>
      </div>
    </section>
  );
}
