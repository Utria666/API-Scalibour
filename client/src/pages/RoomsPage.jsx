import React, { useEffect, useState } from "react";
import { useRoom } from "../context/RoomContext";
import RoomCard from "../components/RoomCard";
import imgCarusel1 from "../assets/carusel1.webp";

const images = [imgCarusel1, imgCarusel1, imgCarusel1];

function ClientRoomsView() {
  const { room, getRoomsAvailable } = useRoom();
  const [expandedCardId, setExpandedCardId] = useState(null);

  useEffect(() => {
    getRoomsAvailable();
  }, []);

  const roomsByType = {};
  room.forEach((room) => {
    if (!roomsByType[room.nombre_tipo_habitacion]) {
      roomsByType[room.nombre_tipo_habitacion] = room;
    }
  });

  const handleCardClick = (cardId) => {
    if (expandedCardId === cardId) {
      setExpandedCardId(null); // Cerrar la tarjeta si se hace clic en la que ya está expandida.
    } else {
      setExpandedCardId(cardId); // Expandir la tarjeta que se hizo clic.
    }
  };

  return (
    <div className="overflow-y-auto h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 mx-4">
        {Object.values(roomsByType).map((roomItem) => (
          <RoomCard
            key={roomItem.habitacion_Id}
            room={roomItem}
            isExpanded={expandedCardId === roomItem.habitacion_Id}
            onCardClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
}

export default ClientRoomsView;
