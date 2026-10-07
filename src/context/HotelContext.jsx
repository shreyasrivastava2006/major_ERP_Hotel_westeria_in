import { createContext, useContext, useState } from "react";

const HotelContext = createContext(null);

export function HotelProvider({ children }) {
  const [selectedHotel, setSelectedHotel] = useState(() => {
    try {
      const savedHotel = localStorage.getItem("selectedHotel");

      return savedHotel ? JSON.parse(savedHotel) : null;
    } catch (error) {
      console.error("Error loading selected hotel:", error);
      localStorage.removeItem("selectedHotel");
      return null;
    }
  });

  const selectHotel = (hotel) => {
    setSelectedHotel(hotel);

    try {
      localStorage.setItem(
        "selectedHotel",
        JSON.stringify(hotel)
      );
    } catch (error) {
      console.error("Error saving selected hotel:", error);
    }
  };

  const clearHotel = () => {
    setSelectedHotel(null);
    localStorage.removeItem("selectedHotel");
  };

  return (
    <HotelContext.Provider
      value={{
        selectedHotel,
        selectHotel,
        clearHotel,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
}

export function useHotel() {
  const context = useContext(HotelContext);

  if (!context) {
    throw new Error(
      "useHotel must be used inside HotelProvider"
    );
  }

  return context;
}

export default HotelContext;