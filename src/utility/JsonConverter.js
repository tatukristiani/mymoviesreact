
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