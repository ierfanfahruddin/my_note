import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Impor Framer Motion
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";
import { fetchWeather } from "../services/api";

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
      const url = await fetchWeather(city);
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

  const getWeatherAnimation = (condition) => {
    switch (condition) {
      case "Rain":
        return {
          y: [0, 5, 0],
          transition: { repeat: Infinity, duration: 0.5 },
        };
      case "Snow":
        return {
          rotate: [0, 10, -10, 0],
          transition: { repeat: Infinity, duration: 1 },
        };
      default:
        return {
          scale: [1, 1.1, 1],
          transition: { repeat: Infinity, duration: 2 },
        };
    }
  };

  return (
    <motion.div
      className="weather-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="weather-card"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="search-bar"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <input
            type="text"
            ref={inputRef}
            placeholder="Search for a city..."
            onKeyDown={handleKeyDown}
          />
          <motion.img
            src={search_icon}
            alt="Search city"
            onClick={() => searchWeather(inputRef.current.value)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        </motion.div>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              className="loading"
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: 1, rotate: 360 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              Loading...
            </motion.div>
          ) : !weatherData ? (
            <motion.div
              key="error"
              className="not-found"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {error || "City not found"}
            </motion.div>
          ) : (
            <motion.div
              key="weather"
              className="weather-info"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <motion.img
                src={weatherData.icon}
                animate={getWeatherAnimation(weatherData.weatherCondition)}
                whileTap={{ scale: 0.95 }}
              />
              <motion.div
                className="temp-location"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <p className="temperature">{weatherData.temperature}°C</p>
                <p className="location">{weatherData.location}</p>
              </motion.div>
              <motion.div
                className="weather-details"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <motion.div
                  className="detail-item"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img src={humidity_icon} alt="Humidity icon" />
                  <div>
                    <p>{weatherData.humidity}%</p>
                    <span>Humidity</span>
                  </div>
                </motion.div>
                <motion.div
                  className="detail-item"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img src={wind_icon} alt="Wind speed icon" />
                  <div>
                    <p>{weatherData.windSpeed} m/s</p>
                    <span>Wind Speed</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default Weather;
