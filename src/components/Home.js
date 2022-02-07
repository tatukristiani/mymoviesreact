import React, {useState, useEffect} from 'react';
import axios from "axios";
import "./Home.css";

// Base url for posters
const base_url = "https://image.tmdb.org/t/p/original/";

const Home = ({fetchUrl}) => {
    const[movies,setMovies] = useState([]);

    // Instance where to send requests to, request links will append to this.
    const instance = axios.create({
        baseURL: "https://api.themoviedb.org/3",
    });

    // Everytime fetchUrl data changes will load.
    useEffect(() => {
        const abortCont = new AbortController();

        async function fetchData() {
            const request = await instance.get(fetchUrl, {signal: abortCont.signal}); // fetchUrl is defined in requests file
            console.log(request.data.results);
            setMovies(request.data.results);
            return request;
        }
        fetchData().then(res => console.log(res)).catch(err => {
            if(err.name === "AbortError") {
                console.log("Fetch aborted");
            } else {
                console.log(err);
            }
        });

        return () => abortCont.abort();
    }, [fetchUrl]);

    return (
        <div>
            <h1>Home</h1>
            <div className="home-container">
                {movies.map((movie => (
                        <img
                            key={movie.id}
                            className="movie-image"
                            src={`${base_url}${movie.poster_path}`}
                            alt={movie.name}/>
                    )))}
            </div>
        </div>
    );
};

export default Home;