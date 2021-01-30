import React from 'react';
import "./styles/SignUp.css";
import "./styles/SignUpError.css";
import googleIcon from "../../images/google-icon.png";

function SignUp() {

  // Create green border on hover
  // Selected = green border 2px solid

  // Create separate error variables for each input, if one of the inputs are
  // empty when submitting form, the styling should change to have:
  // red border 1px solid red
  // red font in the placeholder
  // a new div should show up that says "Enter your first/last name" or "Email" is not valid
  // Separate classNames for each input, error styling should be in its own folder called SignUpError.css
  // Must also change 'Create an account' div if the height changes so that it fits the screen in mobile view
  const error = false;

  return (
    <div className="sign-up">
      <form className="sign-up-form">
        <h2 className="create-an-account">Create an account</h2>
        <input
         className={!error ? "sign-up-form-input first-name" :  "sign-up-form-input first-name error" } 
         type="text" 
         placeholder="First name"
        />
        <input 
          className={!error ? "sign-up-form-input last-name" :  "sign-up-form-input last-name error" }  
          type="text" 
          placeholder="Last name"
        />
        <input 
          className={!error ? "sign-up-form-input email" :  "sign-up-form-input email error" }  
          type="email" 
          placeholder="Email"
        />
        <input 
          className={!error ? "sign-up-form-input password" :  "sign-up-form-input password error" }  
          type="password" 
          placeholder="Password" 
          required
        />
        <button className="sign-up-form-button">Sign up</button>
        <p>Already have an account? <a className="log-in-a-tag" href="/log-in">
          Log in
        </a></p>
        <p>Or</p>
        <button className="continue-with-google">
          <img src={googleIcon} alt=""/>
          Continue with Google
        </button>
        <br/>
      </form>
    </div>
  );
}

export default SignUp;