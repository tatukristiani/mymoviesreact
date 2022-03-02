import React, {useContext, useEffect, useState} from 'react';
import POSTER_URL from "../api/poster";
import {Link} from "react-router-dom";
import {UserMoviesContext} from "../utility/UserMoviesContext";


/**
 * Movie component. Specifically used to create a Link to MovieDetails page & image element of the movie.
 * @param movie data of the movie that was sent to this component.
 * @param databaseData boolean value that tells if the data of the movie is from database(true) or from the TMDB API(false).
 * @returns {JSX.Element} Link element with img element inside of it.
 * @constructor Creates the Movie component with the given movie and databaseData value.
 */
const Movie = ({movie, databaseData}) => {
    const {savedUserMovies} = useContext(UserMoviesContext); // Users movies from database.
    const [watched, setWatched] = useState(false); // Determines if the movie is on the users database.


    // Goes through all the movies from the database and if the movie given to this Movie element is in there, sets the state of watched to true.
    useEffect(() => {
        savedUserMovies.forEach(m => {
            if((movie.title === m.title && movie.tmdbid === m.tmdbid) || (movie.title === m.title && movie.id === m.tmdbid)) {
                setWatched(true);
            }
        })
    })

    return(
        <>
            {databaseData ? (
            <Link to={`/movies/${movie.tmdbid}`}>{
                <img key={movie.id}
                     className={watched ? "movie-image-seen" : "movie-image"}
                     src={`${POSTER_URL}${movie.poster_path}`}
                     alt={movie.title}
                />
            }</Link>

            ) : (
                <Link to={`/movies/${movie.id}`}>{
                    <img key={movie.id}
                         className={watched ? "movie-image-seen" : "movie-image"}
                         src={`${POSTER_URL}${movie.poster_path}`}
                         alt={movie.title}
                    />
                }</Link>
            )}
        </>
    )
}
export default Movie;