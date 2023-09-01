const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];
const minutesNumbers = generateNumber(Array.from(Array(60).keys()))
const hourNumbers = generateNumber(Array.from(Array(13).keys()))

function generateNumber(value) {
    value = value.map(hour => {
        if (hour < 10) {
            hour = "0" + hour
        }
        return hour
    })
    return value
}

export { minutesNumbers, hourNumbers,MONTHS }
