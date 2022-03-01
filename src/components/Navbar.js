import React, {useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import '../styles/Navbar.css';
import {UserContext} from "../utility/UserContext";

const Navbar = () => {
    const {savedUser, setSavedUser} = useContext(UserContext);
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);


    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    const logout = () => {
        setSavedUser(null);
        closeMobileMenu();
    }

    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                        My Movies
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Browse
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/movies' className='nav-links' onClick={closeMobileMenu}>
                                My Movies
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/search' className='nav-links' onClick={closeMobileMenu}>
                               Search
                            </Link>
                        </li>
                        {savedUser &&
                            <li className='nav-item'>
                                <Link to='/profile' className='nav-links' onClick={closeMobileMenu}>
                                    {savedUser}
                                </Link>
                            </li>
                        }
                        <li className='nav-item'>
                            {savedUser ? (
                                <Link to='/' className='nav-links-mobile' onClick={logout}>Logout</Link>
                            ) : (
                                <Link to='/login' className='nav-links-mobile' onClick={closeMobileMenu}>Sign In</Link>
                            )}

                        </li>
                    </ul>
                    {button && !savedUser &&  <Button to='/login' buttonStyle='btn--outline'>Sign In</Button> }
                    {button && savedUser && <Button to='/' onClick={logout} buttonStyle='btn--outline'>Logout</Button>}
                </div>
            </nav>
        </>
    )
}

export default Navbar;