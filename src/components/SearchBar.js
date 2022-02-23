import React from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({value, onChange, handleSearch}) => {

    return(
        <div className="search-container">
            <input className="search-input" type="text" placeholder="Search" value={value} onChange={onChange} onKeyPress={handleSearch} />
            <button className='search-button' onClick={handleSearch}><i className="fa fa-search"></i></button>
        </div>

    )
}

export default SearchBar;