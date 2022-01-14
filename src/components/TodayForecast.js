import './TodayForecast.scss';

const TodayForecast = ({data, location}) => {

    return (
        <div className='today-forecast'>
            <h1>{location}</h1>
            <img src={`https://openweathermap.org/img/wn/${data.hourly[0].weather[0].icon}@2x.png`} alt="weather-icon"/>
        </div>
    )
}

export default TodayForecast;