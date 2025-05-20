import Link from 'next/link';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import Image from 'next/image';

export default function About() {
  return (
    <section className="container mx-auto py-16 px-6">
      {/* Encabezado con fotografía */}
      {/* Encabezado con fotografía */}
      <div className="flex flex-col md:flex-row items-center mb-12">
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
            priority
            className="rounded-full shadow-lg w-56 md:w-64 mx-auto hidden dark:block"
          />
        </div>
        <div className="md:ml-8 text-center md:text-left">
          <h1 className="text-4xl font-bold text-yellow-300  mb-4 dark:text-yellow-300">
            David Y. Villa Durán
          </h1>
          <h2 className="text-lg text-gray-800 font-light dark:text-gray-300">
            Ingeniero en Electrónica & Desarrollador Full Stack
          </h2>
          <Link
            href="/cv/cv082024Español.pdf"
            download
            className="mt-4 inline-block bg-primary text-white px-6 py-3 rounded-lg shadow-md hover:bg-secondary dark:bg-yellow-400 dark:hover:bg-primary transition duration-300"
          >
            Descargar CV
          </Link>
        </div>
      </div>

      {/* Descripción Extensa */}
      <div className="text-gray-700 leading-relaxed dark:text-gray-300">
        <h2 className="text-3xl font-bold text-yellow-300  mb-6 dark:text-yellow-300">
          Mi Trayectoria
        </h2>
        <p className="mb-4">
          Desde una edad temprana, inspirado por el enfoque visionario de mi
          padre, desarrollé una profunda afinidad por la tecnología y la
          innovación. Como Ingeniero Electrónico, he consolidado una base
          robusta en el diseño y análisis de circuitos, sistemas embebidos y
          automatización avanzada. Mi trabajo se centra en la integración
          eficiente de hardware y software, optimizando arquitecturas
          electrónicas para desarrollar soluciones tecnológicas de alto
          rendimiento que impulsan la innovación en la industria.
        </p>
        <p className="mb-4">
          Durante mi trayectoria profesional, he trabajado en la implementación
          de sistemas avanzados de monitoreo y automatización, diseñando
          dispositivos electrónicos que optimizan procesos industriales y
          aumentan la eficiencia operativa. En la industria de la Mineria,
          deseñando e implementando sistemas HMI (Interfaz Hombre Maquina),
          calibracion de sensores, de flujo, nivel, etc. Mi capacidad para
          integrar sensores, microcontroladores y tecnologías IoT (Internet of
          Things) ha sido clave para llevar a cabo proyectos innovadores en
          diversas industrias.
        </p>
        <p className="mb-4">
          Al evolucionar en mi carrera, he complementado mi experiencia en
          electrónica con el desarrollo de software, especializándome en
          aplicaciones web modernas y escalables. Como desarrollador full stack,
          domino herramientas como React, Next.js, Php, Phyton, Laravel y
          Tailwind CSS para crear plataformas funcionales, responsivas y
          accesibles, siempre priorizando la experiencia del usuario.
        </p>
        <p className="mb-4">
          Entre mis logros, destaco la creación de sistemas automatizados de
          control energético y la implementación de plataformas digitales que
          conectan dispositivos electrónicos con interfaces visuales intuitivas.
          Este enfoque holístico, que combina hardware y software, permite
          ofrecer soluciones robustas y completas que superan las expectativas.
        </p>
        <p>
          Soy un firme creyente en la tecnología como herramienta para
          transformar vidas, y mi objetivo es seguir aprendiendo, colaborando y
          creando proyectos innovadores. Valoro profundamente el trabajo en
          equipo y las oportunidades para liderar iniciativas tecnológicas que
          impacten positivamente en el mundo.
        </p>
      </div>

      {/* Línea Cronológica */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-white dark:text-yellow-300 mb-8 text-center">
          Mi Trayectoria Profesional
        </h2>
        <div className="relative border-l-4 border-gray-400 dark:border-yellow-300 ml-npm8">
          {/* Hito 1 */}
          <div className="mb-12 ml-6 relative">
            <div className="absolute -left-7 top-0 w-14 h-14 bg-primary text-white dark:bg-yellow-300 rounded-full flex items-center justify-center shadow-lg">
              2007
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-secondary dark:text-yellow-400">
                Técnico Superior como "Analista de Sistemas"
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Completé mi formación académica, adquiriendo conocimientos
                fundamentales en diseño de software y aplicaciones windows
                utilizando las tecnologias .NET, C, C++, Visual Foxpro,etc;
                ademas del uso de base de datos relacionales SQL.
              </p>
            </div>
          </div>
          {/* Hito 2 */}
          <div className="mb-12 ml-6 relative">
            <div className="absolute -left-7 top-0 w-14 h-14 bg-primary text-white dark:bg-yellow-300 rounded-full flex items-center justify-center shadow-lg">
              2013
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-secondary dark:text-yellow-400">
                Grado en Ingenieria Electronica
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Completé mi formación académica como Ingeniero en Electrónica,
                adquiriendo conocimientos fundamentales en diseño de circuitos,
                programación, automatismos y sistemas embebidos.
              </p>
            </div>
          </div>
          {/* Hito 3 */}
          <div className="mb-12 ml-6 relative">
            <div className="absolute -left-7 top-0 w-14 h-14 bg-primary text-white dark:bg-yellow-300 rounded-full flex items-center justify-center shadow-lg">
              2010
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-secondary dark:text-yellow-400">
                Primer lugar en la IV feria Exposicion e innovacion
                Tecnologica{' '}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Ganador del primer lugar en la categoria Concurso con el tema de
                investigacion: "Procesamiento Digital de una Señal de Audio"
              </p>
            </div>
          </div>
          {/* Hito  4*/}
          <div className="mb-12 ml-6 relative">
            <div className="absolute -left-7 top-0 w-14 h-14 bg-primary text-white dark:bg-yellow-300 rounded-full flex items-center justify-center shadow-lg">
              2024
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-secondary dark:text-yellow-400">
                BootCamp Hamilo
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Culminado con exito el BootCamp "Hamilo" donde se desarrolló
                sistemas Full Stack con tecnologias como Vue, LiveWire,
                JavaScript, Html, Css, TailWind, Laravel, Php, Mysql, etc.
              </p>
            </div>
          </div>
          {/* Hito 5 */}
          <div className="mb-12 ml-6 relative">
            <div className="absolute -left-7 top-0 w-14 h-14 bg-primary text-white dark:bg-yellow-300 rounded-full flex items-center justify-center shadow-lg">
              2024
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-secondary dark:text-yellow-400">
                Transición al Desarrollo Full Stack
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Comencé a desarrollar aplicaciones web modernas utilizando
                frameworks como React y Next.js, integrando hardware con
                software.
              </p>
            </div>
          </div>
          {/* Hito 6 */}
          <div className="mb-12 ml-6 relative">
            <div className="absolute -left-7 top-0 w-14 h-14 bg-primary text-white dark:bg-yellow-300 rounded-full flex items-center justify-center shadow-lg">
              2025
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-secondary dark:text-yellow-400">
                Fundación de Mi Propio Blog
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Lanzamiento de mi blog personal para compartir conocimiento
                sobre desarrollo web, sistemas embebidos y liderazgo
                tecnológico.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enlaces a Redes Sociales, Blog y Proyectos */}
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          Conéctate Conmigo
        </h2>
        <p className="text-gray-600 mb-6">
          Puedes explorar mi blog, mis proyectos y seguirme en redes sociales
          para conocer más sobre mi trabajo y trayectoria.
        </p>
        <div className="flex justify-center space-x-6">
          <a
            href="https://www.facebook.com/profile.php?id=61576240820775"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-secondary transition"
          >
            <FaFacebook size={32} />
          </a>
          <a
            href="https://twitter.com/davidvilladuran"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-secondary transition"
          >
            <FaTwitter size={32} />
          </a>
          <a
            href="https://www.linkedin.com/in/david-villa-9a40ba2ab"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-secondary transition"
          >
            <FaLinkedin size={32} />
          </a>
          <a
            href="https://github.com/DavidYVilla/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-secondary transition"
          >
            <FaGithub size={32} />
          </a>
        </div>
        <div className="mt-8">
          <Link
            href="/blog"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg shadow-md hover:bg-secondary transition duration-300 mx-2"
          >
            Visitar Blog Personal
          </Link>
          <Link
            href="/#projects"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg shadow-md hover:bg-secondary transition duration-300 mx-2"
          >
            Ver Proyectos
          </Link>
        </div>
      </div>
    </section>
  );
}
