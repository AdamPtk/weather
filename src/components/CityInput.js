import './CityInput.scss';

const CityInput = ({value, change}) => {
    return  (
        <label>
            City:
            <input type="text" value={value} onChange={e => change(e)}/>
        </label>
    )
}

export default CityInput;