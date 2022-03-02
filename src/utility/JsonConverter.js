/**
 * Convert an array of data to a string.
 * @param jsonData array of strings.
 * @returns {string} Separated string from each other with a comma.
 */
export default function convertJson(jsonData) {
    let string = "";
    for(let i = 0; i < jsonData.length; i++) {
        if(i === 0) {
            string = jsonData[i].name;
        } else {
            string += ", " + jsonData[i].name;
        }
    }
    return string;
}