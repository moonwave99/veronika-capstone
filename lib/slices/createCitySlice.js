import { countries } from "../db";
import { v4 as uuidv4 } from "uuid";

export const createCitySlice = (set, get) => ({
  countries,
  addCity: (formData) => {
    const { city, countryID, startDate, endDate, note, hotels, places, food } =
      formData;
    set((state) => ({
      countries: state.countries.map((country) => {
        if (country.id === countryID) {
          return {
            ...country,
            cities: [
              ...country.cities,
              {
                city,
                startDate,
                endDate,
                hotels,
                places,
                food,
                note,
                id: uuidv4(),
              },
            ],
          };
        }
        return country;
      }),
    }));
  },
  findCityByID: (cityID) => {
    const countries = get().countries;
    const cities = countries
      .map((country) =>
        country.cities.map((city) => ({ ...city, country: country.country }))
      )
      .flat();
    return cities.find((city) => city.id === cityID);
  },

  deleteCity: (cityID) => {
    set((state) => ({
      countries: state.countries.map((country) => {
        const newCities = country.cities.filter((city) => city.id !== cityID);
        return { ...country, cities: newCities };
      }),
    }));
  },
  updateCity: (cityID, updatedCityData) => {
    set((state) => ({
      countries: state.countries.map((country) => {
        const newCities = country.cities.map((city) => {
          if (city.id === cityID) {
            return {
              ...city,
              ...updatedCityData,
            };
          }
          return city;
        });

        return { ...country, cities: newCities };
      }),
    }));
  },
  updateHotels: (cityID, hotel) => {
    set((state) => ({
      countries: state.countries.map((country) => {
        const newCities = country.cities.map((city) => {
          if (city.id === cityID) {
            const isHotelNew = !city.hotels.find((h) => h.id === hotel.id);
            const hotels = isHotelNew
              ? [...city.hotels, hotel]
              : city.hotels.map((h) => (h.id === hotel.id ? hotel : h));

            return {
              ...city,
              hotels,
            };
          }
          return city;
        });

        return { ...country, cities: newCities };
      }),
    }));
  },
});
