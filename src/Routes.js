import React from "react";
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Home from './components/Home/Home';
import About from './components/About/About';
import SignUp from './components/SignUp/SignUp';
import LogIn from "./components/LogIn/LogIn";
import Campsite from "./components/Campsite/Campsite";


function Routes() {

  return (
    <BrowserRouter>
      <div className="App">
        
        <Navbar />
        
        <Switch>
          <Route 
            exact path="/" 
            render={ () => <Home /> }
          />
          <Route 
            exact path="/about" 
            component={About}
          />
          <Route 
            exact path="/sign-up" 
            render={ () => <SignUp /> } 
          />
          <Route 
            exact path="/log-in" 
            render={ () => <LogIn /> } 
          />
          <Route path="/:id" component={Campsite} />
        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default Routes;
