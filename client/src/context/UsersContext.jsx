import { createContext, useContext, useState, useMemo } from "react";
import { getUsersRequest, createUserRequest } from "../api/users";

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within an UserProvider");
  }
  return context;
};

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState();

  const getUsers = async () => {
    try {
      const res = await getUsersRequest();
      setUsers(res.data);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const createUser = async (user) => {
    try {
      const res = await createUserRequest(user);
      setUsers(res.data);
      setError(null);
      console.log(res);
    } catch (error) {
      setError(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  const value = useMemo(
    () => ({
      users,
      getUsers,
      createUser,
      error,
    }),
    [users, error]
  );

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

