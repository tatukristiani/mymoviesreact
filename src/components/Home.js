import React, { useState, useEffect } from 'react';
import "../styles/Home.css";
import Movie from "./Movie";
import '../styles/Movies.css';
import Paginate from "./Paginate";
import requests from "../utility/request";
import FetchMovies from '../utility/FetchMovies';


/**
 * Home page of the site, at the same time it's the "trending" genre.
 * @returns {JSX.Element} Home component with trending movies.
 * @constructor Creates the Home component
 */
const Home = () => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
    }

    useEffect(() => {
        FetchMovies(requests.fetchTrending, currentPage).then(res => setMovies(res));
    }, [currentPage])

    return (
        <>
            <div>
                <div className="home-container">
                    {movies.map((movie => (
                        <Movie key={movie.id} movie={movie} databaseData={false} />
                    )))}
                </div>
                <div className='paginate-container'>
                    <Paginate onPageChange={handlePageClick} />
                </div>
            </div>
        </>
    );
};

export default Home;