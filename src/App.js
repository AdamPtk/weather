import './App.scss';
import { useState, useEffect, createContext } from 'react';
import TodayForecast from './components/TodayForecast';
import DailyForecast from './components/DailyForecast';
import CityInput from './components/CityInput';
import CountryInput from './components/CountryInput';
import LocalClock from './components/LocalClock';
import Logo from './components/Logo';

export const AppContext = createContext([]);

const App = () => {
  const [city, setCity] = useState('Yakutsk');
  const [countryCode, setCountryCode] = useState('')
  const [cityCoord, setCityCoord] = useState(null);
  const [cityData, setCityData] = useState(null);
  const [cityTime, setCityTime] = useState(null);
  const [search, setSearch] = useState('');
  const [validation, setValidation] = useState(false);
  const [unit, setUnit] = useState(true);

  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

  useEffect(() => {
    getCityCoord();
  }, [city])

  useEffect(() => {
    getCityData();
  }, [cityCoord, unit])

  useEffect(() => {
      getCityTime();
  }, [cityData])

  const getCityCoord = async () => {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city},${countryCode}&appid=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        setCityCoord(data[0]);
        setCityTime(null);
      })
      .catch(err => console.warn(err))
  }

  const getCityData = async () => {
    if (cityCoord) {
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityCoord.lat}&lon=${cityCoord.lon}&units=${unit ? 'metric' : 'imperial'}&exclude=minutely&appid=${apiKey}`)
        .then(res => res.json())
        .then(data => {
          setCityData(data);
        })
        .catch(err => (console.warn(err)))
    }
  }

  const getCityTime = async () => {
    if (cityData) {
      fetch(`https://worldtimeapi.org/api/timezone/${cityData.timezone}`)
      .then(res => res.json())
      .then(data => {
        setCityTime(data)
      })
      .catch(err => console.warn(err))
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (!search || !countryCode) {
      setValidation(true);
    } else {
      setCityCoord(null);
      setCityData(null);
      setCity(search);
      setSearch('');
      setValidation(false);
    }
  }

  const handleChange = e => {
    setSearch(e.target.value);
  }

  const handleSelect = e => {
    setCountryCode(e)
  }

  const renderFiveDays = () => {
    const fiveDays = cityData.daily.slice(1,6);
    return (
      fiveDays.map(el => {
        return <DailyForecast key={el.dt} data={el} />
      })
    )
  }

  return (
    <AppContext.Provider value={{unit}}>
      <div className="App">
        <header>
          <Logo />
          <form onSubmit={e => handleSubmit(e)}>
                <CityInput value={search} valid={validation} change={handleChange}/>
                <CountryInput valid={validation} setValid={setValidation} handleSelect={handleSelect}/>
                <input type="submit" value="Search" />
          </form>
          <LocalClock />
        </header>

        {cityData && cityCoord ? 
          <>
            <div className='today'>
              <TodayForecast
                unit={unit}
                changeUnit={setUnit} 
                data={cityData} 
                location={cityCoord.name} 
                time={cityTime}/>
            </div>
            <div className='forecast'>
              {renderFiveDays()}
            </div>
          </>
          : 
            <h1 className='error'>No such city, try different name or country</h1>
        }
      </div>
    </AppContext.Provider>
  );
}

export default App;