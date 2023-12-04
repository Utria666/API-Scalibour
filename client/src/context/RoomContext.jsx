import { createContext, useContext, useState, useMemo } from "react";
import { getRoomsAvailableRequest,getRoomsRequest } from "../api/room";

const RoomContext = createContext();

export const useRoom = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error("useRoom must be used within a RoomProvider");
  }
  return context;
};

export function RoomProvider({ children }) {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);

  const getRooms= async () => {
    try {
      const res = await getRoomsRequest();
      setRooms(res.data);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const getRoomsAvailable = async () => {
    try {
      const res = await getRoomsAvailableRequest();
      setRooms(res.data);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const value = useMemo(
    () => ({
      rooms,
      getRoomsAvailable,
      getRooms,
      error,
    }),
    [rooms, error]
  );

  return (
    <RoomContext.Provider value={value}>
      {children}
    </RoomContext.Provider>
  );
}
