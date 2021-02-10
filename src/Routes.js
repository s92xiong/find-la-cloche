import React, { useEffect, useState } from "react";
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Home from './components/Home/Home';
import About from './components/About/About';
import SignUp from './components/SignUp/SignUp';
import LogIn from "./components/LogIn/LogIn";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import getCampsites from "./components/Home/getCampsites";


function Routes() {

  const [campsites, setCampsites] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      getCampsites(campsites, setCampsites);
      // console.table(campsites);
    }
  }, [campsites, user]);

  return (
    <BrowserRouter>
      <div className="App">
        
        <Navbar />
        
        <Switch>
          <Route 
            exact path="/" 
            render={(props) =>
              <Home 
              {...props} 
              campsites={campsites}
              setCampsites={setCampsites}
              />
            }
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
        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default Routes;
