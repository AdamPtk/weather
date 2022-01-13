import './DailyForecast.scss'

const DailyForecast = ({data}) => {
    return (
        <div className='daily-forecast'>
            <p>{data.temp.morn}</p>
            <p>{data.temp.day}</p>
            <p>{data.temp.night}</p>
            <p>{data.humidity}</p>
        </div>
    )
}

export default DailyForecast;