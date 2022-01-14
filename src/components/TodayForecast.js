import './TodayForecast.scss';

const TodayForecast = ({data}) => {

    return (
        <div className='today-forecast'>
            <img src={`https://openweathermap.org/img/wn/${data.hourly[0].weather[0].icon}@2x.png`} alt="weather-icon"/>
        </div>
    )
}

export default TodayForecast;