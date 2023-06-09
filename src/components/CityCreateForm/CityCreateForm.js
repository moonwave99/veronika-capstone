import { useState } from "react";
import { useRouter } from "next/router";
import { useAppStore } from "@/lib/store";
import { v4 as uuidv4 } from "uuid";
import { countries } from "@/lib/db";
import Header from "../Header/Header";
import {
  StyledButton,
  StyledLink,
  StyledFormContainer,
  StyledInput,
  StyledTextarea,
  StyledLabel,
  StyledDiv,
  StyledInputSmall,
  StyledSelect,
  StyledSection,
  StyledDivSection,
} from "./StyledCityCreate";
import CreateHotel from "../Hotel";
import CreatePlace from "../Place";
import CreateFood from "../Food";

export default function Form() {
  const router = useRouter();
  const addCity = useAppStore((state) => state.addCity);

  const [hotels, setHotels] = useState([
    { id: uuidv4(), hotel: "", hotelPrice: "" },
  ]);

  const [places, setPlaces] = useState([
    { id: uuidv4(), place: "", placePrice: "" },
  ]);
  const [food, setFood] = useState([
    { id: uuidv4(), foodName: "", foodPrice: "" },
  ]);

  function handleSubmit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    addCity({ ...data, hotels: hotels, places: places, food: food });
    event.target.reset();
    router.push("/");
  }

  function handleHotelClick() {
    setHotels([...hotels, { id: uuidv4(), hotel: "", hotelPrice: "" }]);
  }
  function handleHotelChange(newHotel) {
    console.log(newHotel);
    setHotels(
      hotels.map((hotel) => {
        if (hotel.id === newHotel.id) {
          return newHotel;
        }
        return hotel;
      })
    );
  }

  function handlePlaceClick() {
    setPlaces([...places, { id: uuidv4(), place: "", placePrice: "" }]);
  }
  function handlePlaceChange(newPlace) {
    setPlaces(
      places.map((place) => {
        if (place.id === newPlace.id) {
          return newPlace;
        }
        return place;
      })
    );
  }

  function handleFoodClick() {
    setFood([...food, { id: uuidv4(), foodName: "", foodPrice: "" }]);
  }
  function handleFoodChange(newFood) {
    setFood(
      food.map((food) => {
        if (food.id === newFood.id) {
          return newFood;
        }
        return food;
      })
    );
  }

  return (
    <>
      <Header title="Create Your Travel" />
      <StyledLink href="/">Back</StyledLink>
      <StyledFormContainer aria-labelledby="city" onSubmit={handleSubmit}>
        <StyledLabel htmlFor="countryName">Country:</StyledLabel>
        <StyledSelect id="countryName" name="countryID" required>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.country}
            </option>
          ))}
        </StyledSelect>

        <StyledDiv>
          <div>
            <StyledLabel htmlFor="cityName">Add city:</StyledLabel>
            <StyledInput
              id="cityName"
              name="city"
              type="text"
              placeholder="...add city"
              required
            />
          </div>
          <div>
            <StyledLabel htmlFor="startDate">Start date:</StyledLabel>
            <StyledInputSmall id="startDate" name="startDate" type="date" />
          </div>
          <div>
            <StyledLabel htmlFor="endDate">End date:</StyledLabel>
            <StyledInputSmall id="endDate" name="endDate" type="date" />
          </div>
        </StyledDiv>
        <StyledSection>
          <StyledDivSection>
            {hotels.map((hotel) => (
              <CreateHotel
                key={hotel.hotel}
                handleHotelChange={handleHotelChange}
                hotel={hotel}
              />
            ))}
          </StyledDivSection>

          <StyledButton type="button" onClick={handleHotelClick}>
            Add
          </StyledButton>
        </StyledSection>

        <StyledSection>
          <StyledDivSection>
            {places.map((place) => (
              <CreatePlace
                key={place.place}
                handlePlaceChange={handlePlaceChange}
                place={place}
              />
            ))}
          </StyledDivSection>
          <StyledButton type="button" onClick={handlePlaceClick}>
            Add
          </StyledButton>
        </StyledSection>

        <StyledSection>
          <StyledDivSection>
            {food.map((food) => (
              <CreateFood
                key={food.foodName}
                handleFoodChange={handleFoodChange}
                food={food}
              />
            ))}
          </StyledDivSection>

          <StyledButton type="button" onClick={handleFoodClick}>
            Add
          </StyledButton>
        </StyledSection>
        <StyledLabel htmlFor="notes">Notes:</StyledLabel>
        <StyledTextarea
          name="note"
          id="notes"
          cols="30"
          rows="10"
          placeholder="...add your notes"
        ></StyledTextarea>

        <StyledButton type="submit">Create</StyledButton>
      </StyledFormContainer>
    </>
  );
}
