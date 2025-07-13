import { useEffect } from "react";
import "./App.css";
import { useState } from "react";

function App() {
  const currentDate = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[currentDate.getMonth()];
  // console.log(currentDate.getMonth())
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const formattedDate = `${month} ${day}, ${year}`;
  // const [date, setDate] = useState(formattedDate);
  const [city, setCity] = useState("Delhi");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const API_KEY = "948be5e8508956e5563942c8ebd2a743";

  const fetchWeatherData = async () => {
    try{
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setWeather(data);
        setError(null);
      }
      else{
        setError(data.message)
      }
    }
    catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Failed to fetch weather data");
      setWeather(null);
    }
  };

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };
  useEffect(() => {
    fetchWeatherData();
  }, []);

  const getWeatherIconUrl = (main) => {
    switch (main) {
      case "Clear":
        return "/sun.webp";
      case "Rain":
        return "/rain_with_cloud.webp";
      case "Snow":
        return "/thunder.webp";
      case "Haze":
        return "/Tornado.webp";
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen ">
        <div className="bg-blue-500 h-[550px] w-[300px] rounded-2xl p-3">
          <div className="pt-15 text-center flex flex-col justify-center items-center">
            <p className="text-lg text-gray-300">{formattedDate}</p>
            <h1 className="text-4xl font-bold text-white">{weather?.name}</h1>
            <img
              src={getWeatherIconUrl(weather?.weather[0].main)}
              alt=""
              width="180px"
            />
            <h2 className="text-5xl font-bold text-white">
              {weather?.main.temp}°C
            </h2>
            <div className="flex p-3 mt-10">
              <form action="#" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Enter city"
                  className="bg-slate-200 border-0 rounded-tl p-1"
                  value={city}
                  onChange={handleInputChange}
                />
                <button className="bg-white border-0 cursor-pointer p-1">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
