import { useEffect, useMemo, useState } from "react";
import SimpleTable from "../components/Dashboard/SimpleTable";
import { useUser } from "../context/UsersContext";

function UsersPage() {
  const { createUser, users, getUsers, error } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values) => {
    await createUser(values);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await getUsers();
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const data = useMemo(
    () =>
      users.map((user) => ({
        ID: user.cliente_id,
        identificacion: user.identificacion,
        nombre: user.nombres,
        correo: user.correo,
        rol: user.nombre_rol,
      })),
    [users]
  );

  const columns = [
    {
      header: "ID",
      accessorKey: "ID",
    },
    {
      header: "Identificacion",
      accessorKey: "identificacion",
    },
    {
      header: "Nombre",
      accessorKey: "nombre",
    },
    {
      header: "Email",
      accessorKey: "correo",
    },
    {
      header: "Rol",
      accessorKey: "rol",
    },
    
  ];

  const formFields = [
    {
      id: "identificacion",
      label: "identificacion",
      type: "text",
      placeholder: "123456789",
      validation: {
        required: "La identificacion es obligatoria",
        pattern: {
          value: /^\d{5,11}$/,
          message: "La identificación debe tener 5 y 11 números",
        },
      },
    },
    {
      id: "nombres",
      label: "Nombre",
      type: "text",
      placeholder: "Ejemplo",
      validation: {
        required: "El nombre es obligatorio",
      },
    },
    {
      id: "correo",
      label: "Email",
      type: "email",
      placeholder: "ejemplo@ejemplo.com",
      validation: {
        required: "El email es obligatorio",
      },
    },
    {
      id: "clave",
      label: "Contraseña",
      type: "password",
      placeholder: "",
      validation: {
        required: "La contraseña es requerida",
        pattern: {
          value: /^(?=.*[A-Z])(?=.*[a-zA-Z0-9]).{8,}$/,
          message:
            "La contraseña debe tener al menos 8 caracteres, una mayúscula y un número",
        },
      },
    },
  ];


  return (
    <SimpleTable
      data={data}
      columns={columns}
      title={"Usuarios"}
      formFields={formFields}
      modalTitle={"Crear Usuario"}
      onSubmit={onSubmit}
      serverError={error}
    />
  );
}

export default UsersPage;
