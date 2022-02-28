import {useState} from "react";
import axios from "../api/axios";
import requests from "../requestsTest";


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

    const sendEmail = async (e) => {
        e.preventDefault();
        if(email !== '') {
            if (e.key === 'Enter' || e.target.tagName.toLowerCase() === 'form') {
                const results = await axios.post(requests.resetPassword, data, {
                    headers: {'Content-Type': 'application/json'}
                });
                if(results.status === 200) {
                    setResponse(results.data);
                }
            }
        } else {
            setError(true);
        }
    }

    return(
        <div className='forgot-password-container'>
            {error && <p className='forgot-password-error'>Please enter a valid email address!</p>}
            <form onSubmit={sendEmail}>
                <label >Enter your email address to recover your password
                <input className='user-email-input'
                       type='email'
                       name='email'
                       placeholder='Enter your email address'
                       onChange={handleEmailChange}
                       value={email}
                />
                </label>
                <input type='submit' value='Recover Password'/>
            </form>
            <div>{response}</div>
        </div>
    )
}


export default ForgotPassword;