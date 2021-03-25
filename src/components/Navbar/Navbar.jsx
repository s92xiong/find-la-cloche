import React from 'react';
import "./styles/Navbar.css";
import logo from "../../images/logo.png";
import SignOutDropdown from './SignOutDropdown';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import userIcon from "../../images/person_placeholder.png";
import { useAuthState } from 'react-firebase-hooks/auth';
import downArrow from "../../images/arrow-down.png";

function Navbar() {

  const [user] = useAuthState(auth);
  
  return (
    <nav className="navbar">
      <Link className="about-nav" to="/about">
        About
      </Link>
      <div className="logo-title-container">
        <Link to="/">
          <img src={logo} alt=""/>
        </Link>
        <h1>
          <Link to="/">
            Find LaCloche
          </Link>
        </h1>
      </div>
      {
        (!user) ?
        <div className="login-false">
          <Link to="/sign-up">
            <button className="sign-up-button">Sign Up</button>
          </Link>
          <Link to="/log-in">
            <button className="log-in-button">Log In</button>
          </Link>
        </div>
        :
        <div className="login-true">
          <img 
            className="profile-pic"
            src={(auth.currentUser.photoURL) ? auth.currentUser.photoURL : userIcon}
            alt=""
          />
          <h4>{auth.currentUser.displayName}</h4>
          <SignOutDropdown />
          <img
            // "down-arrow" className is inherited from another css component
            className="down-arrow down-arrow-nav" 
            src={downArrow} 
            alt=""
          />
        </div>
      }
    </nav>
  );
}

export default Navbar;