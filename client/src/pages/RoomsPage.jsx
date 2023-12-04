import SimpleTable from "../components/Dashboard/SimpleTable";
import { useRoom } from "../context/RoomContext";
import { useEffect, useState,useMemo  } from "react";

function RoomsPage() {
  const {rooms,getRooms} = useRoom();
  const [isLoading,setIsLoading] = useState(false);
  const [error,setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await getRooms();
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false)
    };

    fetchData();
  }, []);

 
  const data = useMemo(
    ()=>
    rooms.map((rooms)=> ({
      ID: rooms.habitacion_Id,
      numero: rooms.numero_habitacion, 
      estado: rooms.nombre,
      tipoHabitacion: rooms.nombre_tipo_habitacion,
      descripcion: rooms.descripcion,
      precio: rooms.precio_base,
      capacidad: rooms.capacidad,
    })),
    [rooms]
  )

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  const columns = [
    {
      header: "ID",
      accessorKey: "ID",
    },
    {
      header: "Numero",
      accessorKey: "numero",
    },
    {
      header: "Estado",
      accessorKey: "estado",
    },
    {
      header: "Capacidad",
      accessorKey: "capacidad",
    },
    {
      header: "Tipo de habitacion",
      accessorKey: "tipoHabitacion",
    },
    {
      header: "Descripcion",
      accessorKey: "descripcion",
    },
    {
      header: "Precio",
      accessorKey: "precio",
    },
  ];

  const formFields = [
    {
      id: "Identificacion",
      label: "Identificacion",
      type: "text",
      placeholder: "123456789",
    },
    {
      id: "Nombre",
      label: "Nombre",
      type: "text",
      placeholder: "Ejemplo",
    },
    {
      id: "Email",
      label: "Emial",
      type: "email",
      placeholder: "ejemplo@ejemplo.com",
    },
    {
      id: "Contraseña",
      label: "Contraseña",
      type: "password",
      placeholder: "",
    },
  ];
  return (
    <SimpleTable
      data={data}
      columns={columns}
      title={"Habitaciones"}
      formFields={formFields}
      modalTitle={"Crear Habitaciones"}
      />
  );
}

export default RoomsPage