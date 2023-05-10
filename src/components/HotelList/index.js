import { useState, useEffect } from "react";
import CreateHotel from "@/src/components/Hotel";
import { v4 as uuidv4 } from "uuid";

function getNewHotel() {
  return { id: uuidv4(), hotel: "", hotelPrice: "" };
}

export default function HotelList({ city, handleHotelChange }) {
  const [hotels, setHotels] = useState([getNewHotel()]);

  useEffect(() => {
    setHotels(city.hotels);
  }, [city.hotels]);

  function handleHotelClick() {
    setHotels([...hotels, getNewHotel()]);
  }

  return (
    <div>
      {hotels.map((hotel) => {
        return (
          <CreateHotel
            key={hotel.id}
            hotel={hotel}
            handleHotelChange={handleHotelChange}
          />
        );
      })}
      <button type="button" onClick={handleHotelClick}>
        Add
      </button>
    </div>
  );
}
