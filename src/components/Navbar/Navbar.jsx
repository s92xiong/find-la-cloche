import React from 'react';
import "./styles/Navbar.css";
import icon from "../../images/outdoors-4-64.png";
import UserDropDown from './UserDropDown';
import { Link } from 'react-router-dom';

function Navbar({ user }) {

  const jojo = false;
  
  return (
    <nav className="navbar">
      
      <div className="navbar-left-div">
        <Link to="/">
          <img src={icon} alt=""/>
        </Link>
        <h1 className="title">Find LaCloche</h1>
      </div>
      
      <div className="navbar-right-div">
        <Link className="about" to="/about">
          About
        </Link>
        {
          (!jojo) ?
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
            <img className="profile-pic" src="https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_960_720.png" alt=""/>
            <h4>Jonathan Joestar</h4>
            <UserDropDown />
          </div>
        }
      </div>

    </nav>
  );
}

export default Navbar;