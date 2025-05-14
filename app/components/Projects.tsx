'use client';

import { useTranslation } from 'react-i18next';
import Image from 'next/image';

export default function Projects() {
  const { t } = useTranslation();

  return (
    <section
      id="projects"
      //className="flex-shrink-0 w-full md:w-1/3 mb-6 md:mb-0"
      className="py-16 px-6 container mx-auto"
    >
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        {t('projects.title')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Proyecto 1 */}
        <div className="group border rounded-lg shadow-lg overflow-hidden">
          <Image
            src="/imagenes/proyecto1.png"
            alt="Proyecto 1"
            width={224} // Equivale a Tailwind `w-56`
            height={224}
            priority
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="p-4">
            <h3 className="text-xl font-bold text-secondary mb-2">
              Proyecto 1
            </h3>
            <p className="text-gray-600">
              Un vistazo a mi primer proyecto interactivo.
            </p>
            <a href="#" className="text-yellow-500 hover:underline mt-2 block">
              Ver más
            </a>
          </div>
        </div>
        {/* Proyecto 2 */}
        <div className="group border rounded-lg shadow-lg overflow-hidden">
          <Image
            src="/imagenes/proyecto1.png"
            alt="Proyecto 1"
            width={224} // Equivale a Tailwind `w-56`
            height={224}
            priority
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="p-4">
            <h3 className="text-xl font-bold text-secondary mb-2">
              Proyecto 2
            </h3>
            <p className="text-gray-600">
              Mi trabajo en diseño con animaciones y performance.
            </p>
            <a href="#" className="text-yellow-500 hover:underline mt-2 block">
              Ver más
            </a>
          </div>
        </div>
        {/* Proyecto 3 */}
        <div className="group border rounded-lg shadow-lg overflow-hidden">
          <Image
            src="/imagenes/proyecto1.png"
            alt="Proyecto 1"
            width={224} // Equivale a Tailwind `w-56`
            height={224}
            priority
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="p-4">
            <h3 className="text-xl font-bold text-secondary mb-2">
              Proyecto 3
            </h3>
            <p className="text-gray-600">
              Un proyecto centrado en la experiencia del usuario.
            </p>
            <a href="#" className="text-yellow-500 hover:underline mt-2 block">
              Ver más
            </a>
          </div>
        </div>
      </div>

      <div className="text-center mt-16">
        <a
          href="/pages/projects"
          className="bg-white text-primary px-8 py-3 rounded-lg shadow-md hover:bg-secondary hover:text-white transition-all duration-300"
        >
          {t('projects.butt')}
        </a>
      </div>
    </section>
  );
}
