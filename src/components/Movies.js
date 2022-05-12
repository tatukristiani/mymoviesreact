import React, {useState, useEffect} from 'react';
import axios from "../api/axios";
import "../styles/Home.css";
import Movie from "./Movie";
import {useParams} from "react-router-dom";
import requests from "../utility/request";
import Genres from "../utility/Genres";
import '../styles/Movies.css';
import Paginate from "./Paginate";


/**
 * List of movies to be shown at page. This is mostly used all around but works only when searching with genre.
 * Need the code param from the url to get succeeded results.
 * @returns {JSX.Element} Element that has Movie components and  Paginate component for genre selection.
 * @constructor Creates the Movies component.
 */
const Movies = ({actionMovies, docMovies, romanceMovies, horrorMovies, comedyMovies}) => {
    const [movies,setMovies] = useState([]);
    const {code} = useParams(); // Code for the genre.
    const [codeValid, setCodeValid] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [moviesPerPage, setMoviesPerPage] = useState(28);


    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstPost = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstPost, indexOfLastMovie);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
    }


    const checkGenre = () => {
        switch(code) {
            case Genres.ACTION:
                setCodeValid(true);
                setMovies(actionMovies);
                break;
            case Genres.DOCS:
                setCodeValid(true);
                setMovies(docMovies);
                break;
            case Genres.ROMANCE:
                setCodeValid(true);
                setMovies(romanceMovies);
                break;
            case Genres.COMEDY:
                setCodeValid(true);
                setMovies(comedyMovies);
                break;
            case Genres.HORROR:
                setCodeValid(true);
                setMovies(horrorMovies);
                break;
            default:
                setCodeValid(false);
                break;
        }
    }

    useEffect(() => {
        checkGenre();
    },[actionMovies,docMovies,romanceMovies,horrorMovies,comedyMovies])

    /*
    // If code, codeValid or page changes fetch new movies.
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
    */

    return (
        <>
            {codeValid ? (
                <div>
                    <div className="home-container">
                        {currentMovies.map((movie => (
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