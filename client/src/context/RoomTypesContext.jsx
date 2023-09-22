import { createContext, useContext, useState } from 'react';
import { getRoomTypesRequest } from '../api/roomTypes';

const RoomTypesContext = createContext();

export const useRoomTypes = () => {
  const context = useContext(RoomTypesContext);
  if (!context) {
    throw new Error("useRoomTypes must be used within a RoomTypesProvider");
  }
  return context;
};

export function RoomTypesProvider({ children }) {
  const [roomTypes, setRoomTypes] = useState([]);

  const getRoomTypes = async () => {
    try {
      const res = await getRoomTypesRequest();
      setRoomTypes(res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <RoomTypesContext.Provider value={{ roomTypes, getRoomTypes }}>
      {children}
    </RoomTypesContext.Provider>
  );
}
