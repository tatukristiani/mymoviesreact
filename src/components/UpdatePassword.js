import React, {useState} from 'react';
import {useParams} from "react-router-dom";

const UpdatePassword = () => {
    const {token} = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const sendUpdatedPassword = async (e) => {
        e.preventDefault();
        if(password === confirmPassword) {

        } else {

        }
    }
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    return(
        <div className='update-password-form'>
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
            </form>
        </div>
    )
}

export default UpdatePassword;