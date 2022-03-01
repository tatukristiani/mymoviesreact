import React, { useState} from 'react';
import SearchBar from "./SearchBar";
import Movie from "./Movie";
import axios from "../api/axios";
import requests from "../utility/request";
import '../styles/Search.css';

const Search = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [search, setSearch] = useState('');
    const [searched, setSearched] = useState(false);
    const [error, setError] = useState('');


    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setSearched(false);
        setSearchResults([]);
    }

    const handleSearch = async (e) => {
        if(e.key === 'Enter' || e.target.tagName.toLowerCase() === 'i') {
            const results = await axios.get(requests.search + search);
            console.log(results.data);
            if(results.data.length >= 1) {
                setSearched(true);
            } else {
                setError(results.data.message);
            }
            let resultsArray = results.data.filter(function(movie) {
                return movie.poster_path
            });
            setSearchResults(resultsArray);
        }

    }

    return(
        <>
            <SearchBar value={search} onChange={handleSearchChange} handleSearch={(e) => handleSearch(e)}/>
            {error && <p className='search-error'>{error}</p> }
            {searched &&
                <p className='search-value'>Search Results Found with '{search}'</p>
            }
            <div className='search-result-container'>
                {searchResults.map((movie => (
                    <Movie key={movie.id} movie={movie} databaseData={false}/>
                )))}
            </div>
        </>
    );
};

export default Search;
