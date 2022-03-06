import React, {useEffect, useState} from 'react';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import MyMovies from "./components/MyMovies";
import Search from "./components/Search";
import Register from "./components/Register";
import MovieDetails from "./components/MovieDetails";
import Footer from "./components/Footer";

import {BrowserRouter as Router,Route, Switch} from "react-router-dom";
import './App.css';

import requests from "./utility/request";
import {UserContext} from "./utility/UserContext";
import {UserMoviesContext} from "./utility/UserMoviesContext";
import axios from "./api/axios";
import Movies from "./components/Movies";
import GenreBrowser from "./components/GenreBrowser";
import ForgotPassword from "./components/ForgotPassword";
import UpdatePassword from "./components/UpdatePassword";
import ProfilePage from "./components/ProfilePage";
import Genres from "./utility/Genres";

/**
 * Root component of the application.
 * @returns {JSX.Element} The entire website.
 * @constructor Creates the App component.
 */
const App = () => {
    const [savedUser, setSavedUser] = useState(null);
    const [savedUserMovies, setSavedUserMovies] = useState([]);

    // Testing for speeding up the browsing.
    const [actionMovies, setActionMovies] = useState([]);
    const [romanceMovies, setRomanceMovies] = useState([]);
    const [docMovies, setDocMovies] = useState([]);
    const [comedyMovies, setComedyMovies] = useState([]);
    const [horrorMovies, setHorrorMovies] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);

    useEffect(() => {
        console.log("Fetching trending");
        const trending = fetchMovies(requests.fetchTrending);
        const horror = fetchMovies(requests.fetchGenre + Genres.HORROR + "&page=");
        const action = fetchMovies(requests.fetchGenre + Genres.ACTION + "&page=");
        const comedy = fetchMovies(requests.fetchGenre + Genres.COMEDY + "&page=");
        const romance = fetchMovies(requests.fetchGenre + Genres.ROMANCE + "&page=");
        const doc = fetchMovies(requests.fetchGenre + Genres.DOCS + "&page=");
    },[]);

    async function fetchMovies(url) {
        let trendingMovies = [];
        for(let page = 1; page <= 50; page++) {
            let request = await axios.get(url + page);
            let filterMovies = request.data.filter(movie => {
                if (movie.poster_path !== null) {
                    return movie;
                }
            })
            trendingMovies.push.apply(trendingMovies, filterMovies);
        }
        setTrendingMovies(trendingMovies);
    }

    // Effect used when savedUser is changed. Fetches the currently logged-in users movies and saves them to savedUserMovies.
    useEffect( () => {
        const abortCont = new AbortController();

        async function fetchUserMovies() {
            const request = await axios.get(requests.fetchMyMovies + savedUser, {signal: abortCont.signal});
            setSavedUserMovies(request.data);
        }

        if(savedUser) {
            fetchUserMovies().then(res => console.log(res)).catch(err => {
                if (err.name === "AbortError") {
                    console.log("Fetch aborted");
                } else {
                    console.log(err);
                }
            })
        } else {
            setSavedUserMovies([]);
        }
        return () => abortCont.abort();
    }, [savedUser])

  return (
      <Router>
        <div className="App">
            <UserContext.Provider value={{savedUser, setSavedUser}}>
                <UserMoviesContext.Provider value={{savedUserMovies, setSavedUserMovies}}>
                <Navbar />
                <div className='content'>
                    <Switch>
                        <Route exact path='/profile'>
                            <ProfilePage />
                        </Route>
                        <Route exact path='/movies'>
                            <MyMovies />
                        </Route>
                        <Route exact path='/movies/:id'>
                            <MovieDetails />
                        </Route>
                        <Route exact path='/login'>
                            <Login />
                        </Route>
                        <Route exact path='/search'>
                            <Search />
                        </Route>
                        <Route exact path='/register'>
                            <Register/>
                        </Route>
                        <Route exact path='/forgot-password'>
                            <ForgotPassword />
                        </Route>
                        <Route exact path='/update-password/:token'>
                            <UpdatePassword />
                        </Route>
                        <Route exact path='/movies/genre/:code'>
                            <GenreBrowser />
                            <Movies />
                        </Route>
                        <Route path='/'>
                            <GenreBrowser />
                            <Home />
                        </Route>
                    </Switch>
                </div>
                    <Footer />
                </UserMoviesContext.Provider>
            </UserContext.Provider>
        </div>
      </Router>
  );
}

export default App;
