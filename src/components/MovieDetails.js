import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import POSTER_URL from "../api/poster";
import YoutubeVideo from "../utility/YoutubeVideo";
import {Button} from "./Button";
import axiosOwn from "../api/axios";
import convertJson from "../utility/JsonConverter";
import '../styles/MovieDetails.css';
import {UserContext} from "../utility/UserContext";
import DateFormatter from "../utility/DateFormatter";
import {UserMoviesContext} from "../utility/UserMoviesContext";
import requests from "../requestsTest";


const ADD_URL = "/movies";

const MovieDetails = () => {
    const {savedUser} = useContext(UserContext);
    const {id} = useParams(); // Id for the movie
    const [movie, setMovie] = useState({});
    const [trailer, setTrailer] = useState(''); // Youtube trailer path.
    const {savedUserMovies, setSavedUserMovies} = useContext(UserMoviesContext);
    const [watched, setWatched] = useState(false);

    const handleAddMovie = async () => {
        // Confirm that we have actual data to send.
        if (movie != null && movie.title) {
            console.log("Movie is good to go")


            const dataToAPI = {
                title: movie.title,
                tmdbid: movie.id,
                posterpath: movie.poster_path,
                date: movie.release_date,
                runtime: movie.runtime,
                overview: movie.overview,
                trailerid: trailer,
                genres: convertJson(movie.genres),
                user: savedUser
            };
            console.log("Object to send: " + dataToAPI);
            try {
                const response = await axiosOwn.post(ADD_URL, dataToAPI);
                console.log(response?.status);
                if(response.status === 201) {
                    alert("Movie added successfully.");
                    await fetchMyMovies();
                }
            } catch (err) {
                if (!err?.response) {
                    alert('No Server Response');
                } else if (err.response?.status === 409) {
                    alert(err.response?.data.message);
                } else if (err.response?.status === 500) {
                    alert("Internal errors!");
                } else if (err.response?.status === 400) {
                    alert(err.response?.data.message);
                }
                alert.current.focus();
            }
        } else {
            console.log("Movie is not valid!")
        }
    }

    const handleRemoveMovie = async () => {
        try {
            const response = await axiosOwn.delete(requests.deleteMovie + "?user=" + savedUser + "&title=" + movie.title + "&tmdbid=" + movie.id);
            if(response.status === 200) {
                alert("Movie removed successfully.");
                await fetchMyMovies();
                setWatched(false);
            }
        } catch (err) {
            if (!err?.response) {
                alert('No Server Response');
            } else if(err.response?.status === 404) {
                alert("Problems when removing movie.");
            }
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
    })

    // Goes through all the users movies they've added to their movies and checks if this movie is in there.
    useEffect(() => {
        savedUserMovies.forEach(m => {
            if((movie.title === m.title && movie.tmdbid === m.tmdbid) || (movie.title === m.title && movie.id === m.tmdbid)) {
                setWatched(true);
            }
        })
    })

    // Gets all the users movies and updates the savedUserMovies array.
    const fetchMyMovies = async () => {
        const request = await axiosOwn.get(requests.fetchMyMovies + savedUser);
        setSavedUserMovies(request.data);
    }

    return(
        <>
            <div className='movie-info-container'>
                <div className='video-container'>
                    <YoutubeVideo embedId={trailer}/>
                </div>
                <div className='movie-detail-container'>
                    <div className='image-container'>
                        <img key={movie.id}
                             className="movie-details-image"
                             src={`${POSTER_URL}${movie.poster_path}`}
                             alt={movie.title}
                        />
                    </div>
                    <div className='movie-details'>
                        <h1>{movie.title}</h1>
                        <p>{movie.overview}</p>
                        <p>Runtime: {movie.runtime} min</p>
                        <p>Release date: {DateFormatter(movie.release_date)}</p>
                        <p>Genres: {movie.genres ? convertJson(movie.genres) : ''}</p>
                        {savedUser && !watched  && <Button onClick={handleAddMovie} buttonStyle='btn--details'>Add to My Movies</Button>}
                        {savedUser && watched && <Button onClick={handleRemoveMovie} buttonStyle='btn--details'>Remove</Button>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MovieDetails;




