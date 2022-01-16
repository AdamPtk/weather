import { useState, useEffect } from 'react/cjs/react.development';
import './LocalClock.scss';

const LocalClock = () => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        setInterval(() => setDate(new Date()), 1000);
      }, []);
    return  (
        <h1>{`${date.getHours()}:${date.getMinutes()}:${date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()}`}</h1>
    )
}

export default LocalClock;