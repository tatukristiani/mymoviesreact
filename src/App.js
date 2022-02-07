import React from 'react';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Movies from "./components/Movies";
import Search from "./components/Search";
import './App.css';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import requests from "./requestsTest";

const App = () => {
  return (
      <Router>
        <div className="App">
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
                </Switch>
            </div>
        </div>
      </Router>
  );
}

export default App;
