/**
 * Converts movies minutes to a string.
 * @param runtimeMinutes Minutes given to the function.
 * @returns {string} Example: "Total time watched: 12 h 10 min"
 */
export default function convertMinutesToString(runtimeMinutes) {
    let string = "Total time watched: ";
    if(runtimeMinutes && runtimeMinutes !== 0) {
        const timeInHours = runtimeMinutes / 60;
        const decimalsFromHour = timeInHours - Math.floor(timeInHours);
        const hour = timeInHours - decimalsFromHour;
        const minute = runtimeMinutes - hour * 60;
        return string + hour + " h " + minute + " min";
    } else {
        return string + 0;
    }
}