import { useState, useEffect } from 'react/cjs/react.development';
import './LocalClock.scss';

const LocalClock = () => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        setInterval(() => setDate(new Date()), 1000);
    }, []);

    let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

    return  (
        <h1>{`${hours}:${minutes}:${seconds}`}</h1>
    )
}

export default LocalClock;