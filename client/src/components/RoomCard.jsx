function formatPrice(price) {
  // Intentar convertir la cadena de precio en un número
  const numericPrice = parseFloat(price);

  // Verificar si la conversión fue exitosa y numericPrice es un número válido
  if (!isNaN(numericPrice)) {
    // Redondear el precio a dos decimales y convertirlo nuevamente a cadena
    const roundedPrice = numericPrice.toFixed(2).toString();

    // Eliminar los últimos dos caracteres (los centavos) del precio redondeado
    const priceWithoutCents = roundedPrice.slice(0, -3);

    // Formatear el precio con comas y agregar "pesos colombianos"
    return priceWithoutCents.replace(/\d(?=(\d{3})+(?!\d))/g, "$&,") + " pesos colombianos";
  } else {
    return "Precio no disponible";
  }
}



function RoomCard({ room }) {
  return (
    <div
      className="max-w-sm bg-gray-800 border border-gray-700 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4 text-white"
    >
      <a href="#">
        <img
          className="rounded-t-lg"
          src="https://flowbite.com/docs/images/blog/image-1.jpg"
          alt=""
        />
      </a>
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight">
          {room.nombre_tipo_habitacion}
        </h5>
        <p className="mb-3 font-normal">
        Precio Noche: {formatPrice(room.precio_base)}
        </p>
        <p className="mb-3 font-normal">
          Capacidad: {room.capacidad} personas
        </p>
        <a
          href="#"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Saber más
          <svg
            className="w-3.5 h-3.5 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default RoomCard;
