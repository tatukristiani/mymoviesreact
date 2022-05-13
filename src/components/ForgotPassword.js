import {useEffect, useState} from "react";
import axios from "../api/axios";
import requests from "../utility/request";
import '../styles/ForgotPassword.css';
import {Button} from "./Button";
import validateEmail from "../utility/ValidateEmail";
import validateCredential from "../utility/ValidateCredentials";
import { useHistory } from "react-router-dom";

const WAIT_STRING = 'You will be redirected to login in a few seconds.';

/**
 * ForgotPassword component, used to reset the password of the user. Sends an email to the user.
 * @returns {JSX.Element} Form type element that has input for email and the user can send a request to reset password
 * @constructor Creates the ForgotPassword component.
 */
const ForgotPassword = () => {
    // Forgot password phase variables.
    const [email, setEmail] = useState(''); // Email state of the input
    const [error, setError] = useState(false); // Error for possible error in validation.
    const [response, setResponse] = useState(''); // State for response from the server.
    const [resetActive, setResetActive] = useState(false);

    // Update password phase variables
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [token, setToken] = useState('');
    const [updateResponse, setUpdateResponse] = useState('');
    const [validPassword, setValidPassword] = useState(true);
    const [validConfirmPassword, setValidConfirmPassword] = useState(true);
    const history = useHistory();

    // =============================== FORGOT PASSWORD PHASE =========================================
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

    // ======================= UPDATE PASSWORD PHASE =====================

    // Sends the request to the API. If the password is valid and the token is valid. Then the request will be a success.
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
                setUpdateResponse(results.data.msg);
            } else {
                setUpdateResponse(results.data.msg + "  " + WAIT_STRING);
            }
            setTimeout(() => {
                history.push("/login");
            }, 5000);
        } else if(validateCredential(password)) {
            setValidConfirmPassword(false);
        } else {
            setValidPassword(false);
        }
    }

    const handleTokenChange = (e) => {
        setToken(e.target.value);
    }
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setValidConfirmPassword(true);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setValidPassword(true);
    }

    useEffect(() => {
        if(!resetActive && response !== '') {
            setTimeout(() => {
                setResetActive(true);
            }, 5000);
        }
    }, [resetActive, response])

    return(
        <>
        {!resetActive ? (
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
        ) : (
            <div className='forgot-password-container'>
                <div className='forgot-input-container'>
                    <label className='enter-email-label'>Enter the token below</label>
                    <input className='user-email-input'
                           type='text'
                           name='text'
                           placeholder='Enter Token here'
                           onChange={handleTokenChange}
                           value={token}
                           autoComplete='off'
                    />
                    <input className='user-email-input'
                           type='password'
                           name='password'
                           placeholder='Enter password here'
                           onChange={handlePasswordChange}
                           value={password}
                           autoComplete='off'
                    />
                    {!validPassword && <p className='forgot-password-error'>Password length must be between 4-20!</p>}
                    <input className='user-email-input'
                           type='password'
                           name='confirmPassword'
                           placeholder='Confirm password here'
                           onChange={handleConfirmPasswordChange}
                           value={confirmPassword}
                           autoComplete='off'
                    />
                    {!validConfirmPassword && <p className='forgot-password-error'>Passwords don't match!</p>}
                    <Button buttonStyle='btn--forgot' onClick={sendUpdatedPassword}>Change Password</Button>
                </div>
                <p className='server-response'>{updateResponse}</p>
            </div>
        )}
        </>
    )
}


export default ForgotPassword;