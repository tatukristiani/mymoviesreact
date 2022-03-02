/**
 * Formats a date to better looking format. If the date is a string format "2021-10-12" it creates it to a date the formats it.
 * @param date date to be formatted.
 * @returns {string} Example: December 10, 2021
 * @constructor DateFormatter(date)
 */
export default function DateFormatter(date) {
    let newDate = new Date(date);
    return newDate.toLocaleString("en-US", {month: 'long', day: 'numeric', year: 'numeric'});
}