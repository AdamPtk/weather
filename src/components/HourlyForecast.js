import './HourlyForecast.scss';

const HourlyForecast = ({data, time}) => {

    const renderTemp = (temp) => {
        const result = temp.toFixed();
        //avoid displaying "-0" temperature:
        if (result === '-0') {
            return Math.abs(result);
        }
        return result;
    }

    return (
        <div className='hourly-forecast'>
            <p>{time}</p>
            {/* <p>{renderTime()}</p> */}
            {/* <p>{time ? time.datetime : 0}</p> */}
            <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="weather-icon"/>
            <p>{renderTemp(data.temp)}°</p>
        </div>
    )
}

export default HourlyForecast;