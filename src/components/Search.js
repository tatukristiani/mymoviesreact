import React, {useEffect, useState} from 'react';
import SearchBar from "./SearchBar";
import Movie from "./Movie";
import axios from "../api/axios";
import requests from "../requestsTest";

const Search = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [search, setSearch] = useState('');


    const handleSearchChange = (e) => {
        console.log("Search value: " + search);
        setSearch(e.target.value);
        console.log("Target value: " + e.target.value);
    }

    const handleOnSearch = async () => {
        const results = await axios.get(requests.search + search);
        console.log(results.data);
        setSearchResults(results.data);
    }

    return(
        <>
            <SearchBar value={search} onChange={handleSearchChange} onClick={handleOnSearch}/>
            <div className='search-result-container'>
                {searchResults.map((movie => (
                    <Movie key={movie.id} movie={movie} databaseData={false}/>
                )))}
            </div>
        </>
    );
};

export default Search;
