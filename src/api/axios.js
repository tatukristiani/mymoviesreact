import axios from 'axios';

/**
 * Used to create own request format for the API that this application uses.
 */
export default axios.create({
    baseURL: "https://moviesoftwareapi.herokuapp.com/api/"
});