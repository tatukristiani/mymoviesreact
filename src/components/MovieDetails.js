import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import POSTER_URL from "../api/poster";
import YoutubeVideo from "../utility/YoutubeVideo";
import {Button} from "./Button";
import axiosOwn from "../api/axios";
import convertJson from "../utility/JsonConverter";


const ADD_URL = "/movies";

const MovieDetails = () => {
    const {id} = useParams();
    const [movie, setMovie] = useState({});
    const [trailer, setTrailer] = useState('');

    /*
        function convertGenreToString(jsonGenre) {
            let string = "";
            for(let i = 0; i < jsonGenre.length; i++) {
                if(i === 0) {
                    string = jsonGenre[i].name;
                } else {
                    string += ", " + jsonGenre[i].name;
                }
            }
            return string;
        }
    */
    const handleAddMovie = async () => {

        if (movie != null && movie.title) {
            console.log("Movie is good to go")
        }

        const movieToSend = {
            title: movie.title,
            tmdbid: movie.id,
            posterpath: movie.poster_path,
            date: movie.release_date,
            runtime: movie.runtime,
            overview: movie.overview,
            trailerid: trailer,
            genres: convertJson(movie.genres)
        };
        console.log("Object to send: " + movieToSend);
        try {
            const response = await axiosOwn.post(ADD_URL, movieToSend);
           console.log(response?.data);
        } catch (err) {
            if (!err?.response) {
                alert('No Server Response');
            } else if (err.response?.status === 403) {
                console.log(err.response?.data.error);
                alert(err.response?.data.error);
            } else if (err.response?.status === 500) {
                alert('Internal problems. Apologies.')
            } else {
                alert('Register Failed.')
            }
            alert.current.focus();
        }
    }

    // Used to get the trailer.
    useEffect(() => {
        const abortCont = new AbortController();

        // Getting the Youtube trailer.
        axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=ac4ead2bbde49f3cb342413c09f6d25a`, {signal: abortCont.signal})
            .then(res => {
                let data = res.data.results; // Data is in object format, data is an array of objects.
                let i = 0;
                while(trailer === '' && i < data.length) {
                    if(data[i].name.toUpperCase().includes("TRAILER")) {
                        setTrailer(data[i].key);
                    }
                    i++;
                }
            })
        return () => abortCont.abort();
    }, [id, trailer]);

    // Used to get information about the movie.
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
                <Button onClick={handleAddMovie} buttonStyle='btn--outline'>Add to My Movies</Button>
            </div>
        </>
    )
}

export default MovieDetails;




