import { createContext, useContext, useState } from "react";
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
  const [users, setUsers] = useState([]); // Cambiar user a users

  const getUsers = async () => {
    try {
      const res = await getUsersRequest();
      setUsers(res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const createUser = async (user) => {
    try {
        const res = await createUserRequest(user);
        console.log(res);
    } catch (error) {
        console.log(error); 
    }
  };
  return (
    <UserContext.Provider value={{ users, createUser, getUsers }}>
      {children}
    </UserContext.Provider>
  );
}
