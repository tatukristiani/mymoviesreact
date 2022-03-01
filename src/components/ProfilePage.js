import React, {useContext} from 'react';
import {UserContext} from "../utility/UserContext";
import {UserMoviesContext} from "../utility/UserMoviesContext";


const ProfilePage = () => {
    const {savedUser} = useContext(UserContext);
    const {savedUserMovies} = useContext(UserMoviesContext);


    return(
        <>
            {savedUser ? (
            <div className='profile-container'>
                <h1>Profile of {savedUser}</h1>
                <p>Total movies watched: {savedUserMovies.length}</p>
            </div>
            ) : (
                <div>
                    <h1>You must be logged in to view your profile!</h1>
                </div>
            )
            }
        </>
    )
}

export default ProfilePage;