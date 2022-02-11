import React from 'react';
import POSTER_URL from "../api/poster";
import {Link} from "react-router-dom";

const Movie = ({movie}) => {

    console.log(movie);
    return(
        <>
            <img key={movie.id}
                 className="movie-image"
                 src={`${POSTER_URL}${movie.poster_path}`}
                 alt={movie.title}
                 />
            <Link to={`/movies/${movie.id}`}>Hello</Link>

        </>
    )
}
export default Movie;