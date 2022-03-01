import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import axios from '../api/axios';
import requests from "../utility/request";
import { useHistory } from "react-router-dom";
import {Button} from "./Button";
import '../styles/UpdatePassword.css';
import validateCredential from "../utility/ValidateCredentials";

const WAIT_STRING = 'You will be redirected to login in a few seconds.';

const UpdatePassword = () => {
    const {token} = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [response, setResponse] = useState('');
    const history = useHistory();


    const sendUpdatedPassword = async () => {
        if(password === confirmPassword && validateCredential(password)) {
            const data = {
                token: token,
                password: password
            }
            const results = await axios.post(requests.updatePassword, data, {
                headers: {'Content-Type': 'application/json'}
            });
            if(results.status !== 200) {
                setResponse(results.data.msg);
            } else {
                setResponse(results.data.msg + "  " + WAIT_STRING);
            }
            setTimeout(() => {
                history.push("/login");
            }, 10000);
        } else if(validateCredential(password)) {
            setError('Passwords need to match!');
        } else {
            setError('Password must have 4-20 characters only!');
        }
    }
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setError('');
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setError('');
    }

    return(
        <div className='update-password-container'>
            <h1 className='reset-password-header'>Reset Password</h1>
            {error !== '' && <p className='password-error'>{error}</p>}
           <div className='input-container'>
               <label className='password-label'>Enter your new password</label>
                    <input className='new-password-input'
                           type='password'
                           name='password'
                           onChange={handlePasswordChange}
                           value={password}
                           autoComplete='off'
                           required
                    />
               <label className='confirm-password-label'>Confirm your new password</label>
                    <input className='confirm-password-input'
                           type='password'
                           name='confirmPassword'
                           onChange={handleConfirmPasswordChange}
                           value={confirmPassword}
                           autoComplete='off'
                           required
                    />
                <Button buttonStyle='btn--forgot' onClick={sendUpdatedPassword}>Update Password</Button>
                <p className='server-response'>{response}</p>
            </div>
        </div>
    )
}

export default UpdatePassword;