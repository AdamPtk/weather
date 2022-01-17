import './DailyForecast.scss';
import DayName from './atoms/DayName';
import Temp from './atoms/Temp';

const DailyForecast = ({data}) => {

    return (
        <div className='daily-forecast'>
            <p className='week-day'>
                <DayName value={data.dt} />
            </p>
            <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="weather-icon"/>
            <p className='general'>
                <span className='day'>
                    <Temp value={data.temp.day}/>&nbsp;
                </span>
                <span className='night'>
                    <Temp value={data.temp.night}/>&nbsp;
                </span>
            </p>
            <p>
                Morning:&nbsp;
                <Temp value={data.temp.morn}/></p>
            <p>Humidity: {data.humidity}%</p>
        </div>
    )
}

export default DailyForecast;