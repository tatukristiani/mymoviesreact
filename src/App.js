import React, { useEffect, useState } from 'react';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import MyMovies from "./components/MyMovies";
import Search from "./components/Search";
import Register from "./components/Register";
import MovieDetails from "./components/MovieDetails";
import Footer from "./components/Footer";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';

import requests from "./utility/request";
import { UserContext } from "./utility/UserContext";
import { UserMoviesContext } from "./utility/UserMoviesContext";
import axios from "./api/axios";
import Movies from "./components/Movies";
import GenreBrowser from "./components/GenreBrowser";
import ForgotPassword from "./components/ForgotPassword";
import ProfilePage from "./components/ProfilePage";

/**
 * Root component of the application.
 * @returns {JSX.Element} The entire website.
 * @constructor Creates the App component.
 */
const App = () => {
  const [savedUser, setSavedUser] = useState(null);
  const [savedUserMovies, setSavedUserMovies] = useState([]);

  // Effect used when savedUser is changed. Fetches the currently logged-in users movies and saves them to savedUserMovies.
  useEffect(() => {
    const abortCont = new AbortController();

    async function fetchUserMovies() {
      const request = await axios.get(requests.fetchMyMovies + savedUser, { signal: abortCont.signal });
      setSavedUserMovies(request.data);
    }

    if (savedUser) {
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
        <UserContext.Provider value={{ savedUser, setSavedUser }}>
          <UserMoviesContext.Provider value={{ savedUserMovies, setSavedUserMovies }}>
            <Navbar />
            <div className='content'>
              <Routes>
                <Route exact path='/profile' element={<ProfilePage />} />
                <Route exact path='/movies' element={<MyMovies />} />
                <Route exact path='/movies/:id' element={<MovieDetails />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/search' element={<Search />} />
                <Route exact path='/register' element={<Register />} />
                <Route exact path='/forgot-password' element={<ForgotPassword />} />
                <Route exact path='/movies/genre/:code' element=
                  {
                    <>
                      <GenreBrowser />
                      <Movies />
                    </>
                  } />
                <Route path='/' element=
                  {
                    <>
                      <GenreBrowser />
                      <Home />
                    </>
                  } />
              </Routes>
            </div>
            <Footer />
          </UserMoviesContext.Provider>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
