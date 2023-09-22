import  { useEffect } from "react";
import { useRoomTypes } from "../context/RoomTypesContext";
import DynamicTable from "../components/table"; // Asegúrate de importar el componente DynamicTable

function RoomTypesPage() {
  const { roomTypes, getRoomTypes } = useRoomTypes();
  const headers = ["ID", "Nombre", "Descripcion", "Price", "Capacidad","Acciones"];

  useEffect(() => {
    getRoomTypes();
  }, []);

  const data = roomTypes.map((roomType) => ({
    ID: roomType.tipo_habitacion_id,
    Nombre: roomType.nombre_tipo_habitacion,
    Descripcion: roomType.descripcion,
    Price: roomType.precio_base,
    Capacidad: roomType.capacidad,
    Acciones: (
      <div>
        <button onClick={(lo) => handleEditar(roomType)}>Editar</button>
        <button onClick={() => handleEliminar(roomType)}>Eliminar</button>
      </div>
    ),
  }));  const handleEditar = (roomType) => {
    // Lógica para editar aquí
  };

  const handleEliminar = (roomType) => {
    // Lógica para eliminar aquí
  };

  return (
    <div>
      <DynamicTable headers={headers} data={data} />
    </div>
  );
}

export default RoomTypesPage;
