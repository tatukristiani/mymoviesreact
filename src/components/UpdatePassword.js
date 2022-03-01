import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import axios from '../api/axios';
import requests from "../requestsTest";
import { useHistory } from "react-router-dom";

const WAIT_STRING = 'You will be redirected to login in a few seconds.';

const UpdatePassword = () => {
    const {token} = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(false);
    const [response, setResponse] = useState('');
    const history = useHistory();


    const sendUpdatedPassword = async () => {
        if(password === confirmPassword && password && confirmPassword) {
            const data = {
                token: token,
                password: password
            }
            const results = await axios.post(requests.updatePassword, data, {
                headers: {'Content-Type': 'application/json'}
            });
            if(results.status !== 200) {
                setError(true);
                setResponse(results.data.msg);
            } else {
                setResponse(results.data.msg + "  " + WAIT_STRING);
            }
            setTimeout(() => {
                history.push("/login");
            }, 10000);
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
        <div className='update-password-container'>
            <h1 className='reset-password-header'>Reset Password</h1>
            {error && <p>Passwords don't match!</p>}
           <div className='input-container'>
               <label>Enter your new password</label>
                    <input className='new-password-input'
                           type='password'
                           name='password'
                           onChange={handlePasswordChange}
                           value={password}
                           autoComplete='off'
                           required
                    />
               <label>Confirm your new password</label>
                    <input className='new-password-input'
                           type='password'
                           name='confirmPassword'
                           onChange={handleConfirmPasswordChange}
                           value={confirmPassword}
                           autoComplete='off'
                           required
                    />
                <button className='update-password-button' onClick={sendUpdatedPassword}>Update Password</button>
                <p className='server-response'>{response}</p>
            </div>
        </div>
    )
}

export default UpdatePassword;