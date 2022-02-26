import React, {useEffect, useState} from 'react';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import MyMovies from "./components/MyMovies";
import Search from "./components/Search";
import Register from "./components/Register";
import MovieDetails from "./components/MovieDetails";
import Footer from "./components/Footer";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

import requests from "./requestsTest";
import {UserContext} from "./utility/UserContext";
import {UserMoviesContext} from "./utility/UserMoviesContext";
import axios from "./api/axios";
import Movies from "./components/Movies";
import GenreBrowser from "./components/GenreBrowser";

const App = () => {
    const [savedUser, setSavedUser] = useState(null);
    const [savedUserMovies, setSavedUserMovies] = useState([]);

    // Effect used when savedUser is changed. Fetches the currently logged-in users movies and saves them to savedUserMovies.
    useEffect( () => {
        const abortCont = new AbortController();

        async function fetchUserMovies() {
            const request = await axios.get(requests.fetchMyMovies + savedUser, {signal: abortCont.signal});
            console.log(request.data);
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
                        <Route exact path='/'>
                            <GenreBrowser currentGenre={'Trending'}/>
                            <Home />
                        </Route>
                        <Route exact path='/movies'>
                            <MyMovies />
                        </Route>
                        <Route exact path='/movies/:id'>
                            <MovieDetails />
                        </Route>
                        <Route path='/login'>
                            <Login />
                        </Route>
                        <Route path='/search'>
                            <Search />
                        </Route>
                        <Route path='/register'>
                            <Register/>
                        </Route>
                        <Route path='/movies/genre/:code'>
                            <GenreBrowser />
                            <Movies />
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
