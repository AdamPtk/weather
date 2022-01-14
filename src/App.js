import './App.scss';
import { useState, useEffect } from 'react';
import DailyForecast from './components/DailyForecast';
import TodayForecast from './components/TodayForecast';

const App = () => {
  const [city, setCity] = useState('Yakutsk');
  const [cityCoord, setCityCoord] = useState(null);
  const [cityData, setCityData] = useState(null);

  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

  useEffect(() => {
    getCityCoord();
  }, [city])

  useEffect(() => {
    getCityData();
  }, [cityCoord])

  const getCityCoord = async () => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        setCityCoord(data[0]);
      })
      .catch(err => console.warn(err))
  }

  const getCityData = async () => {
    if (cityCoord) {
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityCoord.lat}&lon=${cityCoord.lon}&units=metric&exclude=minutely&appid=${apiKey}`)
        .then(res => res.json())
        .then(data => setCityData(data))
        .catch(err => (console.warn(err)))
    }
  }

  const renderFiveDays = () => {
    const fiveDays = cityData.daily.slice(1,6);
    return (
      fiveDays.map(el => {
        return <DailyForecast key={el.dt} data={el} />
      })
    )
  }

  console.log(cityCoord);
  console.log(cityData);

  return (
    <div className="App">
      <div className='today'>
        {cityData ? <TodayForecast data={cityData} location={cityCoord.name}/> : null}
      </div>
      <div className='forecast'>
        {cityData ? renderFiveDays() : null}
      </div>
    </div>
  );
}

export default App;