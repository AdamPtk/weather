import './TodayForecast.scss';
import HourlyForecast from './HourlyForecast';

const TodayForecast = ({data, location, time}) => {

    const curr = data.current;
    const daily = data.daily[0];

    const renderTemp = (temp) => {
        const result = temp.toFixed();
        //avoid displaying "-0" temperature:
        if (result === '-0') {
            return Math.abs(result);
        }
        return result;
    }

    const renderDayName = () => {
        const date = new Date(data.daily[0].dt * 1000);
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

    const renderTime = (end) => {
        const index = time.datetime.indexOf('T');
        const localTime = time.datetime.slice(index + 1, index + end)
        return localTime
    }

    const render24Hours = () => {
        const arr24 = data.hourly.slice(0,24);
        const currTime = parseInt(renderTime(3));

        return (
            arr24.map((el, i) => {
                let hour;
                if (currTime + i > 23) {
                    hour = Math.abs(24 - currTime - i);
                }
                else {
                    hour = currTime + i
                }
            return <HourlyForecast key={el.dt} data={el} time={hour}/>
          })
        )
    }

    const renderMeanValue = () => {
        const scope = data.daily.slice(0,6);
        const temp = scope.map(el => {
            return el.temp.day;
        })
        const sum = temp.reduce((tot, el) => {
            return tot + el
        })
        const meanValue = renderTemp(sum/6);

        return meanValue
    }

    renderMeanValue();

    return (
        <div className='today-forecast'>
            <section>
                <main>
                    <h1>{location} </h1>
                    <h1>{renderDayName()} {time ? renderTime(6) : null}</h1>
                    <div className='current'>
                        <img src={`https://openweathermap.org/img/wn/${data.hourly[0].weather[0].icon}@2x.png`} alt="weather-icon"/>
                        <h1>{renderTemp(data.current.temp)}<span>°C</span></h1>
                    </div>
                </main>
                <div className='info'>
                    <p className='general'>
                        <span>Day: {renderTemp(daily.temp.day)}°C &nbsp;</span>
                        <span>Night: {renderTemp(daily.temp.night)}°C</span>
                    </p>
                    <p>Morning: {renderTemp(daily.temp.morn)}°C</p>
                    <p><i className="fas fa-long-arrow-alt-down"></i> Min: {renderTemp(daily.temp.min)}°C <i className="fas fa-long-arrow-alt-up"></i> Max: {renderTemp(daily.temp.max)}°C</p>
                    <p>Mean 6-day daily temperature: {renderMeanValue()}°C Mode: {renderTemp(daily.temp.max)}°C</p>
                    <p>Humidity: {daily.humidity}%</p>
                </div>
            </section>
            <div className='hours24-forecast'>
                {time ? render24Hours() : null}
            </div>
        </div>
    )
}

export default TodayForecast;