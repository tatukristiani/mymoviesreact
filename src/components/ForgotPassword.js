import {useState} from "react";
import axios from "../api/axios";
import requests from "../utility/request";
import '../styles/ForgotPassword.css';
import {Button} from "./Button";
import validateEmail from "../utility/ValidateEmail";

/**
 * ForgotPassword component, used to reset the password of the user. Sends an email to the user.
 * @returns {JSX.Element} Form type element that has input for email and the user can send a request to reset password
 * @constructor Creates the ForgotPassword component.
 */
const ForgotPassword = () => {
    const [email, setEmail] = useState(''); // Email state of the input
    const [error, setError] = useState(false); // Error for possible error in validation.
    const [response, setResponse] = useState(''); // State for response from the server.

    // Data to be sent to the server.
    const data = {
        email: email
    }

    // Handles the state change of the email, also sets the error to false.
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setError(false);
    }

    // Sends a request to the API. If something goes wrong on the server side the response state will tell that.
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