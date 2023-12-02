import SimpleTable from "../components/Dashboard/SimpleTable";
import { getUsersRequest } from "../api/users";
import { useEffect,useState } from "react";

function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsersRequest();
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const columns = [
    {
      header: "ID",
      accessorKey: "cliente_id",
    },
    {
      header: "Identificacion",
      accessorKey: "identificacion",
    },
    {
      header: "Nombre",
      accessorKey: "nombres",
    },
    {
      header: "Email",
      accessorKey: "correo",
    },
    {
      header: "Rol",
      accessorKey: "nombre_rol",
    },
  ];
  return <SimpleTable data={users} columns={columns}></SimpleTable>;

}

export default UsersPage;
