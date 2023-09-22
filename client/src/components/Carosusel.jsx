import React, { useState, useEffect } from "react";

function CarouselComponent({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const nextImage = () => {
    if (!transitioning) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      setTransitioning(true);
    }
  };

  const prevImage = () => {
    if (!transitioning) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      setTransitioning(true);
    }
  };

  useEffect(() => {
    const timer = setInterval(nextImage, 3000); // Cambia a la siguiente imagen cada 3 segundos

    return () => {
      clearInterval(timer); // Limpia el temporizador cuando el componente se desmonta
    };
  }, [currentImageIndex]);

  const handleTransitionEnd = () => {
    setTransitioning(false);
  };

  return (
    <div className="h-screen overflow-y-hidden relative">
      <div
        onTransitionEnd={handleTransitionEnd}
        className={`flex items-center transition-transform duration-500 ease-in-out ${
          transitioning ? "transforming" : ""
        }`}
        style={{
          transform: `translateX(-${currentImageIndex * 100}%)`, // Desliza la imagen horizontalmente
        }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="Carousel Item"
            className="h-full w-full object-cover rounded-lg shadow-lg"
          />
        ))}
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 flex justify-between w-full">
        <button
          className="bg-gray-500 text-white px-2 py-1 rounded-full ml-2"
          onClick={prevImage}
        >
          {"<"}
        </button>
        <button
          className="bg-gray-500 text-white px-2 py-1 rounded-full mr-2"
          onClick={nextImage}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

export default CarouselComponent;
