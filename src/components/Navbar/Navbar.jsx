import React from 'react';
import "./styles/Navbar.css";
import icon from "../../images/outdoors-4-64.png";
import UserDropDown from './UserDropDown';

function Navbar({ user, signUp, logIn }) {

  const jojo = false;
  
  return (
    <nav className="navbar">
      <div className="navbar-left-div">
        <a className="title" href="/">
          <img src={icon} alt=""/>
          <h1>Find LaCloche</h1>
        </a>
      </div>
      <div className="navbar-right-div">
        <a className="about" href="/">
          About
        </a>
        {
          (!jojo) ?
          <div className="login-false">
            <button onClick={signUp}>Sign Up</button>
            <button onClick={logIn}>Log In</button>
          </div>
          :
          <div className="login-true" >
            <img className="profile-pic" src="https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_960_720.png" alt=""/>
            <h4>S Xiong</h4>
            <UserDropDown />
          </div>
        }
      </div>
    </nav>
  );
}

export default Navbar;