import { createContext, useContext, useState, useMemo } from "react";
import {
  getRoomTypesRequest,
  getRoomTypeRequest,
  createRoomTypeRequest,
  updateRoomTypeRequest,
  deleteRoomTypeRequest,
} from "../api/roomTypes";

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
  const [error, setError] = useState(null);

  const getRoomTypes = async () => {
    try {
      const res = await getRoomTypesRequest();
      setRoomTypes(res.data);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const getRoomType = async (id) => {
    try {
      const res = await getRoomTypeRequest(id);
      return res.data;
    } catch (error) {
      setError(error.message);
    }
  };

  const createRoomType = async (roomType) => {
    try {
      const res = await createRoomTypeRequest(roomType);
      setRoomTypes([...roomTypes, res.data]);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const updateRoomType = async (id, updatedRoomType) => {
    try {
      const res = await updateRoomTypeRequest(id, updatedRoomType);
      setRoomTypes(roomTypes.map((rt) => (rt.id === id ? res.data : rt)));
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteRoomType = async (id) => {
    try {
      await deleteRoomTypeRequest(id);
      setRoomTypes(roomTypes.filter((rt) => rt.id !== id));
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const value = useMemo(
    () => ({
      roomTypes,
      getRoomTypes,
      getRoomType,
      createRoomType,
      updateRoomType,
      deleteRoomType,
      error,
    }),
    [roomTypes, error]
  );

  return (
    <RoomTypesContext.Provider value={value}>
      {children}
    </RoomTypesContext.Provider>
  );
}
