export default function Projects() {
    return (
      <section>
        <h2 className="text-3xl font-bold text-primary mb-4">Proyectos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="group border rounded-lg shadow-lg overflow-hidden">
            <img
              src="/imagenes/proyecto1.png"
              alt="Proyecto 1"
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold text-secondary mb-2">
                Proyecto 1
              </h3>
              <p className="text-gray-600">
                Un vistazo a mi primer proyecto interactivo.
              </p>
              <a
                href="#"
                className="text-yellow-500 hover:underline mt-2 block"
              >
                Ver más
              </a>
            </div>
          </div>
          <div className="p-4 border rounded shadow-lg">
            <h3 className="text-xl font-bold text-secondary">Proyecto 1</h3>
            <p className="text-gray-600">Un vistazo a mi primer proyecto interactivo.</p>
          </div>
          <div className="p-4 border rounded shadow-lg">
            <h3 className="text-xl font-bold text-secondary">Proyecto 2</h3>
            <p className="text-gray-600">Mi trabajo en diseño con animaciones y performance.</p>
          </div>
          <div className="p-4 border rounded shadow-lg">
            <h3 className="text-xl font-bold text-secondary">Proyecto 3</h3>
            <p className="text-gray-600">Un vistazo a mi primer proyecto interactivo.</p>
          </div>
          <div className="p-4 border rounded shadow-lg">
            <h3 className="text-xl font-bold text-secondary">Proyecto 4</h3>
            <p className="text-gray-600">Mi trabajo en diseño con animaciones y performance.</p>
          </div>
          <div className="p-4 border rounded shadow-lg">
            <h3 className="text-xl font-bold text-secondary">Proyecto 5</h3>
            <p className="text-gray-600">Un vistazo a mi primer proyecto interactivo.</p>
          </div>
          <div className="p-4 border rounded shadow-lg">
            <h3 className="text-xl font-bold text-secondary">Proyecto 6</h3>
            <p className="text-gray-600">Mi trabajo en diseño con animaciones y performance.</p>
          </div>
          <div className="p-4 border rounded shadow-lg">
            <h3 className="text-xl font-bold text-secondary">Proyecto 7</h3>
            <p className="text-gray-600">Un vistazo a mi primer proyecto interactivo.</p>
          </div>
          <div className="p-4 border rounded shadow-lg">
            <h3 className="text-xl font-bold text-secondary">Proyecto 8</h3>
            <p className="text-gray-600">Mi trabajo en diseño con animaciones y performance.</p>
          </div>
        </div>
      </section>
    );
  }