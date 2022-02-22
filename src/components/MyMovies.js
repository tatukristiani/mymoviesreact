import React, {useContext, useEffect, useState} from 'react';
import Movie from "./Movie";
import {UserContext} from "../utility/UserContext";
import convertMinutesToString from "../utility/convertMinutesToString";
import {UserMoviesContext} from "../utility/UserMoviesContext";
import '../styles/MyMovies.css';

// MyMovies displays users watched movies. Users movies are saved to a UserMoviesContext on login & accessed throug "savedUserMovies" context variable.
const MyMovies = () => {
    const {savedUser} = useContext(UserContext);
    const {savedUserMovies} = useContext(UserMoviesContext);
    const [totalTime, setTotalTime] = useState(0);


    useEffect(() => {
        let totalRuntimeCount = 0;
        savedUserMovies.forEach(movie => {
            totalRuntimeCount += movie.runtime;
        })
        console.log("Total time: " + totalRuntimeCount);
        setTotalTime(() => totalRuntimeCount);

    }, [savedUserMovies])

    return (
        <div className='movies-container'>
            {savedUser ? (
                <div className='movies'>
                    <h1 className='my-movies-header'>{convertMinutesToString(totalTime)}</h1>
                    {savedUserMovies.map((movie => (
                        <Movie key={movie.id} movie={movie} databaseData={true}/>
                    )))}
                </div>
            ) : (
                <h1 className='my-movies-header'>You must be Signed In to view your movies.</h1>
            )
            }
        </div>
    );
};

export default MyMovies;