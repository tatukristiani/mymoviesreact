import React, {useContext, useEffect, useState} from 'react';
import POSTER_URL from "../api/poster";
import {Link} from "react-router-dom";
import {UserMoviesContext} from "../utility/UserMoviesContext";

// Movie component. Specifically used to create a Link to movies details page & image element of the movie.
// Can be either from TMDB API or from database, that's why there's two possible ways to create the elements.
// Movie can be either seen or not seen, img className is therefore either "movie-image" when not seen and "movie-image-seen" when user has added that movie to their list.
const Movie = ({movie, databaseData}) => {
    const {savedUserMovies} = useContext(UserMoviesContext);
    const [watched, setWatched] = useState(false);


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