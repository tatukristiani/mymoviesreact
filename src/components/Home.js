import React, {useState, useEffect} from 'react';
import axios from "../api/axios";
import "../styles/Home.css";
import Movie from "./Movie";
import requests from "../utility/request";
import '../styles/Movies.css';
import Paginate from "./Paginate";

/**
 * Home page of the site, at the same time it's the "trending" genre.
 * @returns {JSX.Element} Home component with trending movies.
 * @constructor Creates the Home component
 */
const Home = (trendingMovies) => {
    const [movies,setMovies] = useState([]); // Movies to be shown. If there are no movies then no movies are shown.
    const [currentPage, setCurrentPage] = useState(1); // Currentpage, using paginate.

    // Handles the page click on the paginate.
    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
    }

    useEffect(() => {
        setMovies(trendingMovies);
    }, [trendingMovies])

    /* OLD WAY TO RENDER MOVIES!
    // When page is changes, fetches new movies with the page number from trending movies.
    useEffect(() => {
        const abortCont = new AbortController();

        // Fetch the movies with the given page and filters the movies so that if they don't have a poster/image they won't be included.
        async function fetchData(page) {
            const request = await axios.get(requests.fetchTrending + page, {signal: abortCont.signal});
            let filterMovies = request.data.filter(movie => {
                if(movie.poster_path !== null) {
                    return movie;
                }
            })
            setMovies(filterMovies);
            return request.data;
        }

        fetchData(currentPage).then(res => console.log(res)).catch(err => {
            if (err.name === "AbortError") {
                console.log("Fetch aborted");
            } else {
                console.log(err);
            }
        });

        return () => abortCont.abort();
    }, [currentPage]);
*/

    const testMovie = () => {
        for(let i = 0; i < movies.length; i++) {
           console.log(movies[i].title);
        }
    }
    return (
        <>
            {movies ? (
                <div>
                    <div className="home-container">
                        {/*
                        {movies[1].map((movie => (
                            <Movie key={movie.id} movie={movie} databaseData={false}/>
                        )))}
                        */}
                        <button onClick={testMovie}>test movie 2</button>
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

export default Home;