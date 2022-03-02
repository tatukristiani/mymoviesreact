import React from 'react';
import '../styles/SearchBar.css';

/**
 * Simple search bar with an input and a button.
 * @param value string value of the input.
 * @param onChange onChange event.
 * @param handleSearch function what to do then some key is pressed.
 * @returns {JSX.Element} div element with input and button.
 * @constructor Create SearchBar component with the given parameters.
 */
const SearchBar = ({value, onChange, handleSearch}) => {

    return(
        <div className="search-container">
            <input className="search-input" type="text" placeholder="Search" value={value} onChange={onChange} onKeyPress={handleSearch} />
            <button className='search-button' onClick={handleSearch}><i className="fa fa-search"></i></button>
        </div>

    )
}

export default SearchBar;