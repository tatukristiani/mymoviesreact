import React, {useContext, useEffect, useState} from 'react';
import Movie from "./Movie";
import {UserContext} from "../utility/UserContext";
import convertMinutesToString from "../utility/ConvertMinutesToString";
import {UserMoviesContext} from "../utility/UserMoviesContext";
import '../styles/MyMovies.css';


/**
 *  MyMovies displays users watched movies. Users movies are saved to a UserMoviesContext on login
 * @returns {JSX.Element} elements which contains movies that the user has added to their list.
 * @constructor Creates the MyMovies component.
 */
const MyMovies = () => {
    const {savedUser} = useContext(UserContext); // Logged in user
    const {savedUserMovies} = useContext(UserMoviesContext); // Logged in users movies.
    const [totalTime, setTotalTime] = useState(0); // Total time spent on movies.


    // When savedUserMovies is changed, the total time is then updated.
    useEffect(() => {
        let totalRuntimeCount = 0;
        savedUserMovies.forEach(movie => {
            totalRuntimeCount += movie.runtime;
        })
        setTotalTime(() => totalRuntimeCount);

    }, [savedUserMovies])

    return (
        <div className='movies-container'>
            {savedUser ? (
                <div className='movies'>
                    <h1 className='my-movies-header'>{convertMinutesToString(totalTime)}</h1>
                    <h1 className='my-movies-header'>Total movies watched: {savedUserMovies.length}</h1>
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