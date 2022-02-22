import React from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({value, onChange, onClick}) => {

    return(
        <div className="search__container">
            <input className="search__input" type="text" placeholder="Search" value={value} onChange={onChange} />
            <button onClick={onClick}>TEST</button>
        </div>

    )
}

export default SearchBar;