import React from 'react';
import '../styles/Footer.css';
import Logo from '../images/TMDB_Logo.svg';


const Footer = () => {

    return(
        <div className='footer'>
            <div className='creator-details'>
                <p>Created by Tatu Pulkkinen</p>
            </div>
            <div className='content-provider-details'>
                <a href='https://www.themoviedb.org/'>
                    <img src={Logo} alt='The Movie Database Logo'/>
                </a>
            </div>
        </div>
    )
}

export default Footer;