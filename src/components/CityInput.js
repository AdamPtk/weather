import './CityInput.scss';

const CityInput = ({value, valid, change}) => {
    return  (
        <label>
            City:
            <input 
                type="text" 
                value={value} 
                onChange={e => change(e)}
                placeholder={valid ? "Cannot be empty" : null}
            />
        </label>
    )
}

export default CityInput;