import React, {useEffect, useState} from 'react';

const Movies = () => {
    const [totalTime, setTotalTime] = useState(0);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        // Fetch all movies from database.
    }, [])

    return (
        <div className='movies-container'>
            <h1>Total Time Watched: {totalTime}</h1>
        </div>
    );
};

export default Movies;