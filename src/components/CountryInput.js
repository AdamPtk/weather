import './CountryInput.scss';
import { useEffect, useState } from 'react';

const CountryInput = ({valid, setValid, handleSelect}) => {
    const [displayedCountry, setDisplayedCountry] = useState('Country')
    const [countries, setCountries] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        fetch('countryCodes.json')
            .then(res => res.json())
            .then(data => {
                setCountries(data);
            })
    }, [])


    return  (
        <div className='select-container'>
        <div className='select' onClick={() => setShowDropdown(!showDropdown)}>
            <i className="fas fa-chevron-down"></i>
            &nbsp;{valid ? <span>Choose country</span> : displayedCountry}
        </div>
        {showDropdown &&
            <div className='select-countries'>
                {countries.map((el, i) => {
                    return <div key={i}
                                onClick={() => {
                                    handleSelect(el.code)
                                    setShowDropdown(!showDropdown)
                                    setValid(false)
                                    setDisplayedCountry(el.name)
                                }}
                            >
                                {el.name}  
                            </div>
                })}
            </div>
        }
        </div>
    )
}

export default CountryInput;