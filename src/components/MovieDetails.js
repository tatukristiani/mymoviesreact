import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import POSTER_URL from "../api/poster";
import YoutubeVideo from "../utility/YoutubeVideo";

const MovieDetails = () => {
    const {id} = useParams();
    const [movie, setMovie] = useState({});
    const [trailer, setTrailer] = useState('');

    useEffect(() => {
        const abortCont = new AbortController();

        axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=ac4ead2bbde49f3cb342413c09f6d25a`, {signal: abortCont.signal})
            .then(res => {
                let data = res.data.results; // Data is in object format, data is an array of objects.
                let i = 0;
                while(!data[i].name.toUpperCase().includes("TRAILER")) {
                    //console.log(data[i].name);
                    i++;
                }
                //console.log(data[i].name);
                setTrailer(data[i].key);
                //console.log("Res: " + data + ", Real: " + trailer);
            })
        return () => abortCont.abort();
    }, [id, trailer]);

    useEffect(() => {
        const abortCont = new AbortController();

        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=ac4ead2bbde49f3cb342413c09f6d25a&append_to_response=videos`, {signal: abortCont.signal})
            .then(res => {
                setMovie(res.data); // data here is an object.
            })
        return () => abortCont.abort();
    }, [])


    return(
        <>
            <div className='movie-info-container'>
                <YoutubeVideo embedId={trailer}/>
                <h1>{movie.title}</h1>
                <p>{movie.overview}</p>
                <img key={movie.id}
                     className="movie-image"
                     src={`${POSTER_URL}${movie.poster_path}`}
                     alt={movie.title}
                />
            </div>
        </>
    )
}

export default MovieDetails;