import React from 'react';
import "./styles/Navbar.css";
import icon from "../../images/outdoors-4-64.png";
import UserDropDown from './UserDropDown';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import userIcon from "../../images/profile-icon.webp";

function Navbar({ user }) {
  
  return (
    <nav className="navbar">
      
      <div className="navbar-left-div">
        <Link to="/"><img src={icon} alt=""/></Link>
        <h1 className="title"><Link to="/">Find LaCloche</Link></h1>
      </div>
      
      <div className="navbar-right-div">
        <Link className="about-nav" to="/about">
          About
        </Link>
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
          <div className="login-true" >
            <img className="profile-pic" src={ (auth.currentUser.photoURL) ? auth.currentUser.photoURL : userIcon  } alt=""/>
            { (auth.currentUser.displayName) ? <h4>{auth.currentUser.displayName}</h4> : <></> }
            <UserDropDown />
          </div>
        }
      </div>

    </nav>
  );
}

export default Navbar;