import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import axios from '../api/axios';
import requests from "../requestsTest";


const UpdatePassword = () => {
    const {token} = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(false);
    const [response, setResponse] = useState('');


    const sendUpdatedPassword = async (e) => {
        e.preventDefault();
        if(password === confirmPassword && password && confirmPassword) {
            const data = {
                token: token,
                password: password
            }
            const results = await axios.post(requests.updatePassword, data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer: ' + token
                }
            })
            if(results.status === 200) {
                setResponse(results.data);
            } else {
                setError(true);
            }
        }
    }
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setError(false);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setError(false);
    }

    return(
        <div className='update-password-form'>
            <h1>Reset Password</h1>
            {error && <p>Passwords don't match!</p>}
            <form onSubmit={sendUpdatedPassword}>
                <label>Enter your new password
                    <input className='new-password-input'
                           type='password'
                           name='password'
                           onChange={handlePasswordChange}
                           value={password}
                           required
                    />
                </label>
                <label>Confirm your new password
                    <input className='new-password-input'
                           type='password'
                           name='confirmPassword'
                           onChange={handleConfirmPasswordChange}
                           value={confirmPassword}
                           required
                    />
                </label>
                <input type='submit' value='Update Password'/>
                <p>{response}</p>
            </form>
        </div>
    )
}

export default UpdatePassword;