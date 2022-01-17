const DayName = ({value}) => {
    const renderDayName = (x) => {
        const date = new Date(x * 1000);
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
    return  (
        <span>{renderDayName(value)}</span>
    )
}

export default DayName;