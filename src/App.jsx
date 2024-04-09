
import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'
import WeatherCard from './components/WeatherCard';

function App() {

  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const succes = (pos) => {
    const obj = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
    }
    setCoords(obj);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(succes);
  }, []);

  useEffect(() => {
    if (coords) {
      const apiKey = 'b0b155eed3df751dc687a2a6a44d378a';
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}`;
      axios.get(url)
        .then(res => {
          const cel = (res.data.main.temp - 273.15).toFixed(1);
          const fah = cel * 9 / 5 + 32;
          setTemp({ cel, fah })
          setWeather(res.data)
        })
        .catch(err => console.log(err))
        .finally(() => {
          setIsLoading(false)
        });
    }
  }, [coords]);

  return (
    <div className='app'>
      {
        isLoading ?
          <h2> Loading...</h2>
          :
          <WeatherCard
            weather={weather}
            temp={temp}
          />
      }
    </div>
  )
}

export default App
