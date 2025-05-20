export default function Projects() {
  return (
    <section>
      <h2 className="text-3xl font-bold text-primary mb-4">Proyectos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="group border rounded-lg shadow-lg overflow-hidden">
          <img
            src="/imagenes/liquor/portada1.png"
            alt="The Majestic Liquor"
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="p-4">
            <h3 className="text-xl font-bold text-secondary mb-2">
              The Majestic Liquor
            </h3>
            <p className="text-gray-600">
              Sistema de control de compra y venta para una licoreria.!
            </p>
            <a href="#" className="text-yellow-500 hover:underline mt-2 block">
              Ver más
            </a>
          </div>
        </div>
        <div className="group border rounded-lg shadow-lg overflow-hidden">
          <img
            src="/imagenes/portafolio/presentacion1.png"
            alt="Portafolio Profesional"
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="p-4">
            <h3 className="text-xl font-bold text-secondary mb-2">
              Portafolio Profesional
            </h3>
            <p className="text-gray-600">
              Desarrollo de mi propio portafolio Profesional. donde podrás
              contactarte con su servidor.!
            </p>
            <a href="#" className="text-yellow-500 hover:underline mt-2 block">
              Ver más
            </a>
          </div>
        </div>
        <div className="group border rounded-lg shadow-lg overflow-hidden">
          <img
            src="/imagenes/blog/pantalla1.png"
            alt="Blog Personal"
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="p-4">
            <h3 className="text-xl font-bold text-secondary mb-2">
              Blog Personal
            </h3>
            <p className="text-gray-600">
              Donde podrás leer los aportes, opiniones y pensamientos en
              distintas áreas del conocimiento y desarrollo personal.
            </p>
            <a href="#" className="text-yellow-500 hover:underline mt-2 block">
              Ver más
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
