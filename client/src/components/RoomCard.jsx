import { useState } from "react";

function formatPrice(price) {
  const numericPrice = parseFloat(price);
  if (!isNaN(numericPrice)) {
    const roundedPrice = numericPrice.toFixed(2).toString();
    const priceWithoutCents = roundedPrice.slice(0, -3);
    return priceWithoutCents.replace(/\d(?=(\d{3})+(?!\d))/g, "$&,") + " pesos colombianos";
  } else {
    return "Precio no disponible";
  }
}

function RoomCard({ room }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`max-w-sm bg-gray-800 border border-gray-700 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4 text-white`}
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
        {isExpanded && (
          <div>
            <p className="mb-3 font-normal">Descripción: {room.descripcion}</p>
            <p className="mb-3 font-normal">Nombre: {room.nombre}</p>
            <p className="mb-3 font-normal">
              Número de Habitación: {room.numero_habitacion}
            </p>
          </div>
        )}
        <div className="mt-4">
          <button
            className={`w-full inline-flex items-center px-3 py-2 text-sm font-medium text-center bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
              isExpanded ? "mb-4" : ""
            }`}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Cerrar" : "Más Información"}
          </button>
          {isExpanded && (
            <button
              className="w-full inline-flex items-center px-3 py-2 text-sm font-medium text-center bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Reservar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default RoomCard;
