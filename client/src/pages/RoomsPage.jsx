import React, { useEffect } from "react";
import { useRoom } from "../context/RoomContext";
import RoomCard from "../components/RoomCard";
import CarouselComponent from "../components/Carosusel";
import imgCarusel1 from "../assets/carusel1.webp";

const images = [
  imgCarusel1,
  imgCarusel1,
  imgCarusel1,
];

function ClientRoomsView() {
  const { room, getRoomsAvailable } = useRoom();

  useEffect(() => {
    getRoomsAvailable();
  }, []);

  const roomsByType = {};
  room.forEach((room) => {
    if (!roomsByType[room.nombre_tipo_habitacion]) {
      roomsByType[room.nombre_tipo_habitacion] = room;
    }
  });

  return (
    <div className="overflow-y-auto h-screen">
      <CarouselComponent images={images} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {Object.values(roomsByType).map((roomItem) => (
          <RoomCard key={roomItem.habitacion_Id} room={roomItem} />
        ))}
      </div>
    </div>
  );
}

export default ClientRoomsView;
