import React from 'react';
import POSTER_URL from "../api/poster";
import {Link} from "react-router-dom";

// Movie component. Specifically used to create a Link to movies details page & image element of the movie.
// Can be either from TMDB API or from database, that's why there's two possible ways to create the elements.
const Movie = ({movie, databaseData}) => {

    console.log("Movie Object:" + movie);
    return(
        <>
            {databaseData ? (
            <Link to={`/movies/${movie.tmdbid}`}>{
                <img key={movie.id}
                     className="movie-image"
                     src={`${POSTER_URL}${movie.poster_path}`}
                     alt={movie.title}
                />
            }</Link>

            ) : (
                <Link to={`/movies/${movie.id}`}>{
                    <img key={movie.id}
                         className="movie-image"
                         src={`${POSTER_URL}${movie.poster_path}`}
                         alt={movie.title}
                    />
                }</Link>
            )}
        </>
    )
}
export default Movie;