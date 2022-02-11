//const API_KEY  = "ac4ead2bbde49f3cb342413c09f6d25a";
//const API = "https://moviesoftwareapi.herokuapp.com/api"
// https://api.themoviedb.org/3
// ID SEARCH: https://api.themoviedb.org/3/movie/644495?api_key=ac4ead2bbde49f3cb342413c09f6d25a&language=en-US
/*
const requests = {
    fetchTrending: `/trending/movie/week?api_key=${API_KEY}&language=en-US`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
}
*/
const requests = {
    fetchTrending: `/home`
}

export default requests;