import React, { useRef, useEffect, useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef();

  const weatherIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": cloud_icon,
    "04n": cloud_icon,
    "09d": drizzle_icon,
    "09n": drizzle_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "11d": wind_icon,
    "11n": wind_icon,
    "13d": snow_icon,
    "13n": snow_icon,
    "50d": humidity_icon,
    "50n": humidity_icon,
  };

  const searchWeather = async (city) => {
    if (!city) return;
    setIsLoading(true);
    setWeatherData(null);
    setError(null);
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "City not found");
      }
      const icon = weatherIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        temperature: Math.round(data.main.temp),
        location: data.name,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        weatherCondition: data.weather[0].main,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(null);
      setError(error.message);
      console.error("Error fetching weather data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    searchWeather("Jepara"); // Default city
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchWeather(inputRef.current.value);
    }
  };

  return (
    <div className="weather-container">
      <div className="weather-card">
        <div className="search-bar">
          <input
            type="text"
            ref={inputRef}
            placeholder="Search for a city..."
            onKeyDown={handleKeyDown}
          />
          <img
            src={search_icon}
            alt="Search city"
            onClick={() => searchWeather(inputRef.current.value)}
          />
        </div>
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : !weatherData ? (
          <div className="not-found">{error || "City not found"}</div>
        ) : (
          <div className="weather-info">
            <img src={weatherData.icon} alt="Weather condition" className="weather-icon" />
            <div className="temp-location">
              <p className="temperature">{weatherData.temperature}°C</p>
              <p className="location">{weatherData.location}</p>
            </div>
            <div className="weather-details">
              <div className="detail-item">
                <img src={humidity_icon} alt="Humidity icon" />
                <div>
                  <p>{weatherData.humidity}%</p>
                  <span>Humidity</span>
                </div>
              </div>
              <div className="detail-item">
                <img src={wind_icon} alt="Wind speed icon" />
                <div>
                  <p>{weatherData.windSpeed} m/s</p>
                  <span>Wind Speed</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;