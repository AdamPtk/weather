import { useContext } from "react";
import { AppContext } from "../../App";

const Temp = ({value}) => {
    const {unit} = useContext(AppContext);

    const renderTemp = (x) => {
        const result = x.toFixed();
        //avoid displaying "-0" temperature:
        if (result === '-0') {
            return Math.abs(result);
        }
        return result;
    }
    return  (
        <span>{renderTemp(value)}{unit ? '°C' : '°F'}</span>
    )
}

export default Temp;