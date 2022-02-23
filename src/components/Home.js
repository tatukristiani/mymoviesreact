import React, {useState, useEffect, useContext} from 'react';
import axios from "../api/axios";
import "../styles/Home.css";
import Movie from "./Movie";


const Home = ({fetchUrl}) => {
    const[movies,setMovies] = useState([]);

    // Everytime fetchUrl data changes will load.
    useEffect(() => {
        const abortCont = new AbortController();

        async function fetchData() {
            const request = await axios.get(fetchUrl, {signal: abortCont.signal});
            console.log(request.data.results);
            setMovies(request.data.results);
            return request;
        }

        fetchData().then(res => console.log(res)).catch(err => {
            if (err.name === "AbortError") {
                console.log("Fetch aborted");
            } else {
                console.log(err);
            }
        });

        return () => abortCont.abort();
    }, [fetchUrl]);

    return (
        <>
            <div className="home-container">
                {movies.map((movie => (
                    <Movie key={movie.id} movie={movie} databaseData={false}/>
                    )))}
            </div>
        </>
    );
};

export default Home;