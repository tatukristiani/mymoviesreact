import React, {useState, useEffect} from 'react';
import axios from "../api/axios";
import "../styles/Home.css";
import Movie from "./Movie";
import {useParams} from "react-router-dom";
import requests from "../requestsTest";
import Genres from "../utility/Genres";
import '../styles/Movies.css';
import Paginate from "./Paginate";



const Movies = () => {
    const [movies,setMovies] = useState([]);
    const {code} = useParams(); // Code for the genre.
    const [codeValid, setCodeValid] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageClick = (data) => {
        console.log(data.selected);
        setCurrentPage(data.selected + 1);
    }

    
    useEffect(() => {
        const abortCont = new AbortController();
        checkCodeValidity();

        async function fetchData(page) {
            const request = await axios.get(requests.fetchGenre + code + "&page=" + page, {signal: abortCont.signal});
            let filterMovies = request.data.filter(movie => {
                if(movie.poster_path !== null) {
                    return movie;
                }
            })
            setMovies(filterMovies);
            return request.data;
        }

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

        if(codeValid) {
               fetchData(currentPage).then(res => console.log(res)).catch(err => {
                    if (err.name === "AbortError") {
                        console.log("Fetch aborted");
                    } else {
                        console.log(err);
                    }
                });
        }
        return () => abortCont.abort();
    },[code, codeValid, currentPage]);
    
    return (
        <>
            {codeValid ? (
                <div>
                    <div className="home-container">
                        {movies.map((movie => (
                            <Movie key={movie.id} movie={movie} databaseData={false}/>
                        )))}
                    </div>
                    <div className='paginate-container'>
                        <Paginate onPageChange={handlePageClick}/>
                    </div>
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