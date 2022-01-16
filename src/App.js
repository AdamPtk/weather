import './App.scss';
import { useState, useEffect } from 'react';
import TodayForecast from './components/TodayForecast';
import DailyForecast from './components/DailyForecast';
import CityInput from './components/CityInput';
import LocalClock from './components/LocalClock';
import Logo from './components/Logo';

const App = () => {
  const [city, setCity] = useState('Yakutsk');
  const [cityCoord, setCityCoord] = useState(null);
  const [cityData, setCityData] = useState(null);
  const [search, setSearch] = useState('');
  const [cityTime, setCityTime] = useState(null);

  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

  useEffect(() => {
    getCityCoord();
    setCityTime(null);
  }, [city])

  useEffect(() => {
    getCityData();
  }, [cityCoord])

  useEffect(() => {
      getCityTime();
  }, [cityData])

  const getCityCoord = async () => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`)
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

  const getCityTime = async () => {
    if (cityData) {
      fetch(`http://worldtimeapi.org/api/timezone/${cityData.timezone}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setCityTime(data)
      })
      .catch(err => console.warn(err))
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    setCity(search);
    setSearch('');
  }

  const handleChange = e => {
    setSearch(e.target.value);
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
      <header>
        <Logo />
        <form onSubmit={e => handleSubmit(e)}>
              <CityInput value={search} change={handleChange}/>
              <input type="submit" value="Search" />
        </form>
        <LocalClock />
      </header>

      {cityData && cityCoord ? 
        <>
          <div className='today'>
            <TodayForecast data={cityData} location={cityCoord.name} time={cityTime}/>
          </div>
          <div className='forecast'>
            {renderFiveDays()}
          </div>
        </>
      : 
      <h1 className='error'>No such city, try different name</h1>
      }
    </div>
  );
}

export default App;