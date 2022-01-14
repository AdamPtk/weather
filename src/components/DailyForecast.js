import './DailyForecast.scss';

const DailyForecast = ({data}) => {

    const renderDayName = () => {
        const date = new Date(data.dt * 1000);
        switch(date.getDay()) {
            case 0:
                return 'Sun';
            case 1:
                return 'Mon';
            case 2:
                return 'Tue';
            case 3:
                return 'Wed';
            case 4:
                return 'Thu';
            case 5:
                return 'Fri';
            case 6:
                return 'Sat';
        }
    }

    const renderTemp = (temp) => {
        const result = temp.toFixed();
        if (result === '-0') {
            return Math.abs(result);
        }
        return result;
    }

    return (
        <div className='daily-forecast'>
            <p className='week-day'>{renderDayName()}</p>
            <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="weather-icon"/>
            <p className='general'><span>{renderTemp(data.temp.day)}°C</span> <span>{renderTemp(data.temp.night)}°C</span></p>
            <p>Morning: {renderTemp(data.temp.morn)}°C</p>
            <p>Humidity: {data.humidity}%</p>
        </div>
    )
}

export default DailyForecast;