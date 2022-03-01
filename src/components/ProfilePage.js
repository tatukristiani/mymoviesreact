import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from "../utility/UserContext";
import requests from "../utility/request";
import axios from '../api/axios';
import {Button} from "./Button";
import '../styles/ProfilePage.css';
import {useHistory} from "react-router-dom";
import validateEmail from "../utility/ValidateEmail";
import validateCredential from "../utility/ValidateCredentials";


const USER_ERROR = 'Username must be between 4-20 characters!';
const EMAIL_ERROR = 'Email must be a valid one! i.e. example@gmail.com';
const ProfilePage = () => {
    const {savedUser, setSavedUser} = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const history = useHistory();
    const [userError, setUserError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [response, setResponse] = useState('');

    useEffect( () => {
        const abortCont = new AbortController();
        //Fetch users information including username, email
        async function fetchUser() {
            const results = await axios.get(requests.fetchUser + savedUser, {signal: abortCont.signal});
            console.log(results.data);
            setEmail(results.data.email);
            setUsername(results.data.username);
            return results.data;
        }
        if (savedUser) {
            fetchUser()
                .then(() => console.log("User information successfully retrieved."))
                .catch(err => console.log(err));
        }
        return () => abortCont.abort();
    },[savedUser])


    const cancelUpdate = () => {
        history.push("/");
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        clearErrors();
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        clearErrors();
    }

    const updateUser = async () => {
        // Validate username & email
        let validEmail = validateEmail(email);
        let validUser = validateCredential(username);
        if(validEmail && validUser) {
            const data = {
                newUsername: username,
                username: savedUser,
                email: email
            }
            const results = await axios.post(requests.updateUser, data, {
                headers: {'Content-Type': 'application/json'}
            });
            if(results.status !== 200) {
                setUserError(results.data.message);
            } else {
                setResponse(results.data.message);
                setSavedUser(username);
            }

        } else if(!validEmail && !validUser){
            setUserError(USER_ERROR);
            setEmailError(EMAIL_ERROR);
        } else if(validUser){
            setEmailError(EMAIL_ERROR);
        } else {
            setUserError(USER_ERROR);
        }
    }

    const clearErrors = () => {
        setUserError('');
        setEmailError('');
    }

    return(
        <>
            {savedUser ? (
            <div className='profile-container'>
                <h1 className='profile-header'>Profile of {savedUser}</h1>
                <div className='user-information-details'>
                    <label className='profile-label'>Username:</label>
                    <input type='text'
                           className='profile-input'
                           name='username'
                           value={username}
                           autoComplete='off'
                           onChange={handleUsernameChange}
                    />
                    <label className='profile-label-email'>Email:</label>
                    <input type='email'
                           className='profile-input'
                           name='email'
                           value={email}
                           autoComplete='off'
                           onChange={handleEmailChange}
                    />
                    <Button buttonStyle='btn--forgot' onClick={updateUser}>Update Information</Button>
                    <Button buttonStyle='btn--forgot' onClick={cancelUpdate}>Cancel</Button>
                    <br></br>
                    {response && <p className='server-response'>{response}</p> }
                    {userError && <p className='error-message'>{userError}</p>}
                    {emailError && <p className='error-message'>{emailError}</p>}
                </div>
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