import React, {useMemo, useState} from 'react';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Movies from "./components/Movies";
import Search from "./components/Search";
import Register from "./components/Register";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

import requests from "./requestsTest";
import {UserContext} from "./utility/UserContext";


const App = () => {
    const [savedUser, setSavedUser] = useState(localStorage.getItem("user"));


  return (
      <Router>
        <div className="App">
            <UserContext.Provider value={{savedUser, setSavedUser}}>
            <Navbar />
            <div className='content'>
                <Switch>
                    <Route exact path='/'>
                        <Home fetchUrl={requests.fetchTrending}/>
                    </Route>
                    <Route path='/movies'>
                        <Movies />
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
                </Switch>
            </div>
            </UserContext.Provider>
        </div>
      </Router>
  );
}

export default App;
