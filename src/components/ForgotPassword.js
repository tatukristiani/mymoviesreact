import {useState} from "react";
import axios from "../api/axios";
import requests from "../utility/request";
import '../styles/ForgotPassword.css';
import {Button} from "./Button";
import validateEmail from "../utility/ValidateEmail";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);
    const [response, setResponse] = useState('');

    const data = {
        email: email
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setError(false);
    }

    const sendEmail = async () => {
        if (validateEmail(email)) {
            const results = await axios.post(requests.resetPassword, data, {
                headers: {'Content-Type': 'application/json'}
            });
            setResponse(results.data.msg);
        } else {
            setError(true);
        }
    }

    return(
        <div className='forgot-password-container'>
            <div className='forgot-input-container'>
                <label className='enter-email-label'>Enter your email address to recover your password</label>
                <input className='user-email-input'
                       type='email'
                       name='email'
                       placeholder='Enter your email address'
                       onChange={handleEmailChange}
                       value={email}
                       autoComplete='off'
                />
                {error && <p className='forgot-password-error'>Please enter a valid email address!</p>}
                <Button buttonStyle='btn--forgot' onClick={sendEmail}>Reset Password</Button>
            </div>
            <p className='server-response'>{response}</p>
        </div>
    )
}


export default ForgotPassword;