import { createContext, useContext, useState } from "react";
import { getRoomsAvailableRequest } from "../api/room";

const RoomContext = createContext();

export const useRoom = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error("useRoom must be used within a RoomProvider");
  }
  return context;
};

export function RoomProvider({ children }) {
  const [room, setRoom] = useState([]);

  const getRoomsAvailable = async () => {
    try {
      const res = await getRoomsAvailableRequest();
      setRoom(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RoomContext.Provider value={{ room, getRoomsAvailable }}>
      {children}
    </RoomContext.Provider>
  );
}
