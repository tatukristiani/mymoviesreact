import React, {useEffect, useState, useRef, useContext} from 'react';
import axios from '../api/axios';
import '../styles/Login.css';
import {Link} from "react-router-dom";
import {UserContext} from "../utility/UserContext";

const LOGIN_URL = '/login'

const Login = () => {
    const {savedUser, setSavedUser} = useContext(UserContext);

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [pending, setPending] = useState(false);
    const [login, setLogin] = useState('Sign In');

    const account = {
        username: user,
        password: pwd
    }

    // Handles login submit. ATM working without jsonwebtoken and without credentials(API accepts all origins)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setPending(true);
        try {
            const response = await axios.post(LOGIN_URL, account,
                {
                    headers: {'Content-Type': 'application/json'},
                    //withCredentials: true use when Access-control allow origin is specified to specific sites
                });
            console.log(JSON.stringify(response?.data));
            setUser('');
            setPwd('');
            localStorage.setItem("user", account.username);
            setSavedUser(localStorage.getItem("user"));
            console.log("User saved: " + savedUser);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Invalid credentials!');
            } else if (err.response?.status === 500) {
                setErrMsg('Internal problems. Apologies.')
            } else {
                setErrMsg('Login Failed')
            }
            errRef.current.focus();
        }
        setPending(false);
    }

    // On load focus on username field.
    useEffect(() => {
        userRef.current.focus();
        console.log(savedUser);
        },[])


    // Disables error messages when username or password is changed.
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    useEffect(() => {
        if(pending) {
            setLogin("Signing In...");
        } else {
            setLogin("Sign In");
        }
    }, [pending])

    return (
        <section>
            <form autoComplete='off' className='form' onSubmit={handleSubmit}>
                <p ref={errRef} className={errMsg ? "error-message" : "off-screen"} aria-live="assertive">{errMsg}</p>
                <div className='control'>
                    <h1>
                        Sign In
                    </h1>
                </div>
                <div className='control block-cube block-input'>
                    <input
                        placeholder='Username'
                        type="text"
                        id="username"
                        ref={userRef}
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
                        {login}
                    </div>
                </button>
                <Link to='/register' className='nav-links register-link'>
                    Don't have an account? Register here!
                </Link>
                <Link className='nav-links forgot-link'>
                    Forgot Password?
                </Link>
            </form>
        </section>
    )
};

export default Login;