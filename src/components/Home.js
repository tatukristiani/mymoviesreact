import React, {useState, useEffect} from 'react';
import "../styles/Home.css";
import Movie from "./Movie";
import '../styles/Movies.css';
import Paginate from "./Paginate";

/**
 * Home page of the site, at the same time it's the "trending" genre.
 * @returns {JSX.Element} Home component with trending movies.
 * @constructor Creates the Home component
 */
const Home = ({trendingMovies}) => {
    const [movies,setMovies] = useState([]); // Movies to be shown. If there are no movies then no movies are shown.
    const [currentPage, setCurrentPage] = useState(1); // Current page, using paginate.
    const [moviesPerPage, setMoviesPerPage] = useState(28);
    const [loading, setLoading] = useState(true);
    const [loadingText, setLoadingText] = useState("Loading...");

    // Handles the page click on the paginate.
    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
    }

    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstPost = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstPost, indexOfLastMovie);

    useEffect(() => {
        setLoading(true);
        setMovies(trendingMovies);
    }, [trendingMovies])

    useEffect(() => {
        if(movies.length > 1) {
            setLoading(false);
        }
    }, [movies])

    return (
        <>
            {!loading ? (
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
                    <p>{loadingText}</p>
                </div>
            )
            }
        </>
    );
};

export default Home;