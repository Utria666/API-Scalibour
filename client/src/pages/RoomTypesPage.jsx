import { useEffect, useState, useMemo } from "react";
import { useRoomTypes } from "../context/RoomTypesContext";
import SimpleTable from "../components/Dashboard/SimpleTable";

function RoomTypesPage() {
  const { roomTypes, getRoomTypes } = useRoomTypes();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const columns = [
    {
      header: "ID",
      accessorKey: "ID",
    },
    {
      header: "Nombre",
      accessorKey: "Nombre",
    },
    {
      header: "Descripcion",
      accessorKey: "Descripcion",
    },
    {
      header: "Precio",
      accessorKey: "Price",
    },
    {
      header: "Capacidad",
      accessorKey: "Capacidad",
    },
  ];

  const formFields = [
    {
      id: "Nombre Habitacion",
      label: "Nombre de Habitacion",
      type: "text",
      placeholder: "Habitacion123",
    },
    {
      id: "Descripcion",
      label: "Descripcion",
      type: "text",
      placeholder: "Descripcion",
    },
    {
      id: "Precio",
      label: "Precio",
      type: "text",
      placeholder: "XXXXXXX",
    },
    {
      id: "Capacidad",
      label: "Capacidad",
      type: "number",
      placeholder: "XX",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await getRoomTypes();
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const data = useMemo(
    () =>
      roomTypes.map((roomType) => ({
        ID: roomType.tipo_habitacion_id,
        Nombre: roomType.nombre_tipo_habitacion,
        Descripcion: roomType.descripcion,
        Price: roomType.precio_base,
        Capacidad: roomType.capacidad,
      })),
    [roomTypes]
  );

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <SimpleTable 
        data={data} 
        columns={columns} 
        title={"Tipos de habitaciones"}
        formFields={formFields} 
        modalTitle={"Crear Usuario"}
      />
    </div>
  );
}

export default RoomTypesPage;
