import { createContext, useContext, useState, useEffect } from "react";
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
  const [errors, setErrors] = useState();

  useEffect(() => {
    if (errors && errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const getUsers = async () => {
    try {
      const res = await getUsersRequest();
      setUsers(res.data);
      setErrors(null);
    } catch (error) {
      setErrors(error.message);
    }
  };

  const createUser = async (user) => {
    try {
      const res = await createUserRequest(user);
      setUsers(res.data);
      setErrors(null);
    } catch (error) {
      setErrors(error.response.data.message);
    }
  };

  return (
    <UserContext.Provider 
    value={{ users, getUsers, createUser, errors }}
    >
      {children}
    </UserContext.Provider>
  );
}
