import React, {useState, useEffect} from 'react';
import axios from "../api/axios";
import "../styles/Home.css";
import Movie from "./Movie";
import {useParams} from "react-router-dom";
import requests from "../requestsTest";
import Genres from "../utility/Genres";
import '../styles/Movies.css';


const Movies = () => {
    const [movies,setMovies] = useState([]);
    const {code} = useParams(); // Code for the genre.
    const [codeValid, setCodeValid] = useState(false);

    useEffect(() => {
        const abortCont = new AbortController();
        checkCodeValidity();

        async function fetchData() {
            const request = await axios.get(requests.fetchGenre + code, {signal: abortCont.signal});
            console.log("Data Home: ", request.data);
            setMovies(request.data);
            return request;
        }

        if(codeValid) {
            fetchData().then(res => console.log(res)).catch(err => {
                if (err.name === "AbortError") {
                    console.log("Fetch aborted");
                } else {
                    console.log(err);
                }
            });
        }

        return () => abortCont.abort();
    }, [code, codeValid]);
    
    function checkCodeValidity() {
        if(code == Genres.ACTION ||
            code == Genres.COMEDY ||
            code == Genres.HORROR ||
            code == Genres.ROMANCE ||
            code == Genres.DOCS ) {
            setCodeValid(true);
        } else {
            setCodeValid(false);
        }
    }

    return (
        <>
            {codeValid ? (
                <div className="home-container">
                    {movies.map((movie => (
                        <Movie key={movie.id} movie={movie} databaseData={false}/>
                    )))}
                </div>
            ) : (
                <div className='movies-not-found'>
                    <p>Sorry... no movies found with the given genre code.</p>
                </div>
            )
            }
        </>
    );
};

export default Movies;