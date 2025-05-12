import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>David Villa Durán | Portafolio</title>
        <meta
          name="description"
          content="Desarrollador Full Stack especializado en Next.js y Tailwind CSS."
        />
        <meta
          name="keywords"
          content="Next.js, React, Tailwind CSS, Full Stack, Desarrollo Web"
        />
        <meta name="author" content="David Y. Villa Durán" />
        {/* Open Graph (para redes sociales) */}
        <meta property="og:title" content="David Villa Durán | Portafolio" />
        <meta
          property="og:description"
          content="Explora mi portafolio con proyectos innovadores en Next.js y Tailwind CSS."
        />
        <meta property="og:image" content="/thumbnail.jpg" />
        <meta property="og:url" content="https://tuportafolio.com" />
        <meta property="og:type" content="website" />
      </Head>

      <main>
        <h1>Bienvenido a mi portafolio</h1>
      </main>
    </>
  );
}
