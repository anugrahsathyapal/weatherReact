import React, { useState } from "react";
import "./Weather.css";

const Weather = () => {
  const [inputCity, setInputCity] = useState("");
  const [weather, setWeather] = useState({});

  const Search = async () => {
    if (inputCity === "") {
      alert("Enter the name of the city!!!");
      return;
    }
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`
      );
      const data = await response.json();
      setWeather(data);
      setInputCity(""); 
    } catch (error) {
      console.log("Error in fetching weather data!!!");
    }
  };

  return (
    <div className="weather">
      <div className="search pb-5">
        <input
          type="text"
          placeholder="Search"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
        />
        <button onClick={Search}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      {weather.main ? (
        <>
          <p className="temperature">{Math.floor(weather.main.temp)}°</p>
          <p className="location">{weather.name}</p>
          <div className="weatherData">
            <div className="col">
              <i
                className="img fa-solid fa-water fa-2xl pt-3"
                style={{ color: "white" }}
              ></i>
              <div>
                <p>{weather.main.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <i
                className="img fa-solid fa-wind fa-2xl pt-3"
                style={{ color: "white" }}
              ></i>
              <div>
                <p>{weather.wind.speed} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center text-white fs-3 mt-5">
          <p>No weather data available.</p>
          <p> Please search for a city.</p>
          <img src="" alt="" />
        </div>
      )}
    </div>
  );
};

export default Weather;
