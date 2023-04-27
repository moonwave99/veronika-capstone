import { useRouter } from "next/router";
import {
  StyleButton,
  StyleList,
  StyleDiv,
  StyleCountry,
  StyleSection,
  StyleSpan,
  StyleH4,
  StyleTotalPrice,
} from "./StyledTripDetails";
import Header from "@/src/components/Header/Header";
import { countries } from "@/lib/db";

export default function DetailsOfTrip() {
  const router = useRouter();
  const cityName = router.query.city;

  /* Get details about the city*/
  const country = countries.find((country) =>
    country.cities.find((city) => city.name === cityName)
  );

  const city = country?.cities.find((city) => city.name === cityName);

  console.log(city);

  if (!city) {
    return <h2>City not found</h2>;
  }

  /* Calculate Hotel Prices */
  const totalHotelPrice = city.hotel.map((hotel) => hotel.price);
  console.log(totalHotelPrice);
  const totalPriceOfHotels = totalHotelPrice.reduce(
    (hotelPrice, price) => hotelPrice + Number(price),
    0
  );
  console.log(totalPriceOfHotels);

  /* Calculate Place Prices */
  const totalPlacePrice = city.place.map((place) => place.price);
  console.log(totalPlacePrice);
  const totalPriceOfPlaces = totalPlacePrice.reduce(
    (placePrice, price) => placePrice + Number(price),
    0
  );
  console.log(totalPriceOfPlaces);

  /* Calculate food Prices */
  const totalFoodPrice = city.food.map((food) => food.price);
  console.log(totalFoodPrice);
  const totalPriceeOfFoods = totalFoodPrice.reduce(
    (foodPrice, price) => foodPrice + Number(price),
    0
  );
  console.log(totalPriceeOfFoods);

  let totalPrice = totalPriceOfHotels + totalPriceOfPlaces + totalPriceeOfFoods;
  console.log(totalPrice);

  /* Back to thr home page*/
  const backHome = () => {
    router.push("/");
  };

  /* Return details about the City */
  return (
    <>
      <Header title="Details of traveling" />
      <StyleButton onClick={backHome}> Home</StyleButton>
      <StyleSection>
        <StyleCountry>{country.name}</StyleCountry>

        <StyleDiv>
          <StyleH4>{city.name}</StyleH4>
          <StyleSpan>
            {city.startDate} - {city.endDate}
          </StyleSpan>
        </StyleDiv>
        <StyleH4>Hotels:</StyleH4>
        <ul>
          {city.hotel.map((hotel) => (
            <StyleList key={hotel.name}>
              <StyleSpan>{hotel.name}</StyleSpan>
              <StyleSpan>{hotel.price} Euro</StyleSpan>
            </StyleList>
          ))}

          <StyleDiv>
            <StyleTotalPrice>Total Price:</StyleTotalPrice>
            <p>{totalPriceOfHotels} Euro</p>
          </StyleDiv>
        </ul>

        <StyleH4>Places to visit:</StyleH4>
        <ul>
          {city.place.map((place) => (
            <StyleList key={place.name}>
              <StyleDiv>
                <StyleSpan>{place.name}</StyleSpan>
                <StyleSpan> {place.price} Euro</StyleSpan>
              </StyleDiv>
            </StyleList>
          ))}

          <StyleDiv>
            <StyleTotalPrice>Total Price:</StyleTotalPrice>
            <p>{totalPriceOfPlaces} Euro</p>
          </StyleDiv>
        </ul>
        <StyleH4>Food to try:</StyleH4>
        <ul>
          {city.food.map((food) => (
            <StyleList key={food.name}>
              <StyleDiv>
                <StyleSpan>{food.name}</StyleSpan>
                <StyleSpan>{food.price} Euro</StyleSpan>
              </StyleDiv>
            </StyleList>
          ))}

          <StyleDiv>
            <StyleTotalPrice>Total Price:</StyleTotalPrice>
            <p>{totalPriceeOfFoods} Euro</p>
          </StyleDiv>
        </ul>
        <StyleDiv>
          <StyleTotalPrice>How much I spent on the trip:</StyleTotalPrice>
          <p>{totalPrice} Euro </p>
        </StyleDiv>
        <StyleH4>Notes:</StyleH4>
        <p>{city.note}</p>
      </StyleSection>
    </>
  );
}