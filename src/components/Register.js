import React, {useEffect, useState, useRef} from 'react';
import axios from '../api/axios';
import './Login.css';
import './Register.css';

import {Link} from "react-router-dom";

const REGISTER_URL = '/register'

const Register = () => {
    const emailRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [email, setEmail] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [pending, setPending] = useState(false);
    const [register, setRegister] = useState('Register');

    const account = {
        username: user,
        password: pwd
    }

    // Handles register, doesn't use jsonwebtoken yet.
    const handleSubmit = async (e) => {
        e.preventDefault();
        setPending(true);
        try {
            const response = await axios.post(REGISTER_URL, account);
            console.log(JSON.stringify(response?.data));
            setEmail('');
            setUser('');
            setPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 403) {
                console.log(err.response?.data.error);
                setErrMsg(err.response?.data.error);
            } else if (err.response?.status === 500) {
                setErrMsg('Internal problems. Apologies.')
            } else {
                setErrMsg('Register Failed.')
            }
            errRef.current.focus();
        }
        setPending(false);
    }

    // On load focus on username field.
    useEffect(() => {
        emailRef.current.focus();
    },[])


    // Disables error messages when username or password is changed.
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, email])

    useEffect(() => {
        if(pending) {
            setRegister("Creating account...")
        } else {
            setRegister("Register")
        }
    }, [pending])

    return (
        <section>
            <form autoComplete='off' className='form' onSubmit={handleSubmit}>
                <p ref={errRef} className={errMsg ? "error-message" : "off-screen"} aria-live="assertive">{errMsg}</p>
                <div className='control'>
                    <h1>
                        Register
                    </h1>
                </div>
                <div className='control block-cube block-input'>
                    <input
                        placeholder='Email address'
                        type="email"
                        id="email"
                        ref={emailRef}
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                    <div className='bg-top'>
                        <div className='bg-inner'></div>
                    </div>
                    <div className='bg-right'>
                        <div className='bg-inner'></div>
                    </div>
                    <div className='bg'>
                        <div className='bg-inner'></div>
                    </div>
                </div>
                <div className='control block-cube block-input'>
                    <input
                        placeholder='Username'
                        type="text"
                        id="username"
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                    />
                    <div className='bg-top'>
                        <div className='bg-inner'></div>
                    </div>
                    <div className='bg-right'>
                        <div className='bg-inner'></div>
                    </div>
                    <div className='bg'>
                        <div className='bg-inner'></div>
                    </div>
                </div>
                <div className='control block-cube block-input'>
                    <input placeholder='Password'
                           type="password"
                           id="password"
                           onChange={(e) => setPwd(e.target.value)}
                           value={pwd}
                           required
                    />
                    <div className='bg-top'>
                        <div className='bg-inner'></div>
                    </div>
                    <div className='bg-right'>
                        <div className='bg-inner'></div>
                    </div>
                    <div className='bg'>
                        <div className='bg-inner'></div>
                    </div>
                </div>
                <button className='btn block-cube block-cube-hover' type='submit'>
                    <div className='bg-top'>
                        <div className='bg-inner'></div>
                    </div>
                    <div className='bg-right'>
                        <div className='bg-inner'></div>
                    </div>
                    <div className='bg'>
                        <div className='bg-inner'></div>
                    </div>
                    <div className='text'>
                        {register}
                    </div>
                </button>
                <Link to='/login' className='nav-links login-link'>
                    Already have an account? Sign In!
                </Link>
            </form>
        </section>
    )
};

export default Register;