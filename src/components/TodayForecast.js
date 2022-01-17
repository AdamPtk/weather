import './TodayForecast.scss';
import HourlyForecast from './HourlyForecast';
import DayName from './atoms/DayName';
import Temp from './atoms/Temp';

const TodayForecast = ({data, location, time, changeUnit, unit}) => {

    const curr = data.current;
    const daily = data.daily[0];

    const renderTime = (end) => {
        const index = time.datetime.indexOf('T');
        const localTime = time.datetime.slice(index + 1, index + end)
        return localTime
    }

    const renderMeanValue = () => {
        const scope = data.daily.slice(0,6);
        const temp = scope.map(el => {
            return el.temp.day;
        })
        const sum = temp.reduce((tot, el) => {
            return tot + el
        })
        const meanValue = <Temp value={sum / 6} />;

        return meanValue
    }

    const renderModeValue = () => {
        const scope = data.daily.slice(0,6);
        const temp = scope.map(el => {
            return <Temp value={el.temp.day} />;
        })

        const mode = {};
        let max = 0, count = 0;
      
        for(let i = 0; i < temp.length; i++) {
          const item = temp[i];
          
          if(mode[item]) {
            mode[item]++;
          } else {
            mode[item] = 1;
          }
          
          if(count < mode[item]) {
            max = item;
            count = mode[item];
          }
        }

        return max;
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

    return (
        <div className='today-forecast'>
            <section>
                <main>
                    <h1>{location} </h1>
                    <h1>
                        <DayName value={data.daily[0].dt} />&nbsp;
                        {time ? renderTime(6) : null}
                    </h1>
                    <div className='current'>
                        <img src={`https://openweathermap.org/img/wn/${data.hourly[0].weather[0].icon}@2x.png`} alt="weather-icon"/>
                        <h1>
                            <Temp value={data.current.temp} />&nbsp;
                            <span onClick={() => changeUnit(!unit)}>
                                | {!unit ? '°C' : '°F'}
                            </span>
                        </h1>
                    </div>
                </main>
                <div className='info'>
                    <p className='general'>
                        <span className='day'>
                            Day:&nbsp;
                            <Temp value={daily.temp.day}/>&nbsp;
                        </span>
                        <span className='night'>
                            Night:&nbsp;
                            <Temp value={daily.temp.night}/>&nbsp;
                        </span>
                    </p>
                    <p>
                        Morning:&nbsp;
                        <Temp value={daily.temp.morn}/>&nbsp;
                        Evening:&nbsp;
                        <Temp value={daily.temp.eve}/>&nbsp;
                    </p>
                    <p>
                        <i className="fas fa-long-arrow-alt-down"></i>&nbsp;
                        Min:&nbsp;
                        <Temp value={daily.temp.min}/>&nbsp;
                        <i className="fas fa-long-arrow-alt-up"></i>&nbsp;
                        Max:&nbsp;
                        <Temp value={daily.temp.max}/>&nbsp;
                    </p>
                    <p>Humidity: {daily.humidity}%</p>
                </div>
                <div className='averages-info'>
                    <p>Mean 6-day daily temperature: {renderMeanValue()}</p>
                    <p>Mode 6-day daily temperature: {renderModeValue()}</p>
                </div>
            </section>
            <div className='hours24-forecast'>
                {time ? render24Hours() : null}
            </div>
        </div>
    )
}

export default TodayForecast;