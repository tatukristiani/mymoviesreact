import React, {useState, useEffect} from 'react';
import axios from "../api/axios";
import "../styles/Home.css";
import Movie from "./Movie";
import requests from "../requestsTest";
import '../styles/Movies.css';
import Paginate from "./Paginate";


const Home = () => {
    const [movies,setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageClick = (data) => {
        console.log(data.selected);
        setCurrentPage(data.selected + 1);
    }

    useEffect(() => {
        const abortCont = new AbortController();

        async function fetchData(page) {
            const request = await axios.get(requests.fetchTrending + page, {signal: abortCont.signal});
            console.log("Data Home: ", request.data);
            setMovies(request.data);
            return request.data;
        }

        fetchData(currentPage).then(res => console.log(res)).catch(err => {
            if (err.name === "AbortError") {
                console.log("Fetch aborted");
            } else {
                console.log(err);
            }
        });

        return () => abortCont.abort();
    }, [currentPage]);


    return (
        <>
            {movies ? (
                <div>
                    <div className="home-container">
                        {movies.map((movie => (
                            <Movie key={movie.id} movie={movie} databaseData={false}/>
                        )))}
                    </div>
                    <div className='paginate-container'>
                        <Paginate onPageChange={handlePageClick}/>
                    </div>
                </div>
            ) : (
                <div className='movies-not-found'>
                    <p>Sorry... no movies found with the given genre code.</p>
                </div>
            )
            }
        </>
    );
};

export default Home;