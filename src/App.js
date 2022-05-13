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
        fetchMovies(requests.fetchTrending).then(response => setTrendingMovies(response));
        fetchMovies(requests.fetchGenre + Genres.HORROR + "&page=").then(response => setHorrorMovies(response));
        fetchMovies(requests.fetchGenre + Genres.ACTION + "&page=").then(response => setActionMovies(response));
        fetchMovies(requests.fetchGenre + Genres.COMEDY + "&page=").then(response => setComedyMovies(response));
        fetchMovies(requests.fetchGenre + Genres.ROMANCE + "&page=").then(response => setRomanceMovies(response));
        fetchMovies(requests.fetchGenre + Genres.DOCS + "&page=").then(response => setDocMovies(response));
        console.log("Movies fetched!");
    },[]);

    async function fetchMovies(url) {
        let movies = [];
        for(let page = 1; page <= 50; page++) {
            let request = await axios.get(url + page);
            // CHANGE!! Filter removed from inside of loop to outside.
            Array.prototype.push.apply(movies, request.data);
        }
        movies = movies.filter(movie => {
            if (movie.poster_path !== null) {
                return movie;
            }
        })
        return movies;
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
                        <Route exact path={process.env.REACT_APP_PUBLIC_URL + '/profile'}>
                            <ProfilePage />
                        </Route>
                        <Route exact path={process.env.REACT_APP_PUBLIC_URL + '/movies'}>
                            <MyMovies />
                        </Route>
                        <Route exact path={process.env.REACT_APP_PUBLIC_URL + '/movies/:id'}>
                            <MovieDetails />
                        </Route>
                        <Route exact path={process.env.REACT_APP_PUBLIC_URL + '/login'}>
                            <Login />
                        </Route>
                        <Route exact path={process.env.REACT_APP_PUBLIC_URL + '/search'}>
                            <Search />
                        </Route>
                        <Route exact path={process.env.REACT_APP_PUBLIC_URL + '/register'}>
                            <Register/>
                        </Route>
                        <Route exact path={process.env.REACT_APP_PUBLIC_URL + '/forgot-password'}>
                            <ForgotPassword />
                        </Route>
                        <Route path={process.env.REACT_APP_PUBLIC_URL + '/update-password/:token'}>
                            <UpdatePassword />
                        </Route>
                        <Route exact path={process.env.REACT_APP_PUBLIC_URL + '/movies/genre/:code'}>
                            <GenreBrowser />
                            <Movies actionMovies={actionMovies} docMovies={docMovies} romanceMovies={romanceMovies}
                                    horrorMovies={horrorMovies} comedyMovies={comedyMovies}
                            />
                        </Route>
                        <Route path={process.env.REACT_APP_PUBLIC_URL + '/'}>
                            <GenreBrowser />
                            <Home trendingMovies={trendingMovies} />
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
