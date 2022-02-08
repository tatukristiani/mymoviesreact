import axios from 'axios';

export default axios.create({
    baseURL: "https://moviesoftwareapi.herokuapp.com/api/"
});