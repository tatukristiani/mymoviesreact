
export default function DateFormatter(date) {
    let newDate = new Date(date);
    return newDate.toLocaleString("en-US", {month: 'long', day: 'numeric', year: 'numeric'});
}