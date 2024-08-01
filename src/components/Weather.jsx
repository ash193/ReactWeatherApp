import { useState, useRef } from "react";
import "./Weather.css";

const weatherIcons = {
  "01d": "fas fa-sun icon-sun",
  "01n": "fas fa-moon icon-moon",
  "02d": "fas fa-cloud-sun icon-cloud-sun",
  "02n": "fas fa-cloud-moon icon-cloud-sun",
  "03d": "fas fa-cloud icon-cloud",
  "03n": "fas fa-cloud icon-cloud",
  "04d": "fas fa-cloud-meatball icon-cloud",
  "04n": "fas fa-cloud-meatball icon-cloud",
  "09d": "fas fa-cloud-showers-heavy icon-rain",
  "09n": "fas fa-cloud-showers-heavy icon-rain",
  "10d": "fas fa-cloud-sun-rain icon-rain",
  "10n": "fas fa-cloud-moon-rain icon-rain",
  "11d": "fas fa-poo-storm icon-rain",
  "11n": "fas fa-poo-storm icon-rain",
  "13d": "fas fa-snowflake icon-snow",
  "13n": "fas fa-snowflake icon-snow",
  "50d": "fas fa-smog icon-smog",
  "50n": "fas fa-smog icon-smog",
};

const WeatherIcon = ({ iconClass }) => (
  <i className={`weather-icon ${iconClass}`}></i>
);

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async (city) => {
    if (!city.trim()) {
      alert("Enter city name");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      const iconClass =
        weatherIcons[data.weather[0].icon] || "fas fa-question-circle";
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        iconClass,
      });
    } catch (error) {
      console.error("Error fetching weather data", error);
      setWeatherData(null);
    }
  };

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Enter city name..." />
        <i
          className="fas fa-search"
          onClick={() => fetchWeatherData(inputRef.current.value)}
        ></i>
      </div>
      {!weatherData ? (
        <div className="placeholder">
          <p>Welcome to the Weather App!</p>
          <p>
            Type a city name above and click the search icon to get the weather
            forecast.
          </p>
        </div>
      ) : (
        <>
          <WeatherIcon iconClass={weatherData.iconClass} />
          <p className="temperature">{weatherData.temperature}°F</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <i className="fas fa-tint icon-humidity"></i>
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <i className="fas fa-wind icon-wind"></i>
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
