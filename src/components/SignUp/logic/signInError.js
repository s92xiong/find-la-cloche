import emailIsValid from "./emailValidation";

function signInError(value, inputError, setInputError) {
  const newError = {...inputError};

  // First and last name should have at least 1 character
  if (value.firstName.length < 1) newError.firstName = true;
  if (value.lastName.length < 1) newError.lastName = true;

  // If the email is not valid (returns false), then set error to true
  if (!emailIsValid(value.email)) newError.email = true;
  
  // Password must be >= 6 characters
  if (value.password.length < 6) newError.password = true;
  setInputError(newError);

  // If any values in the error object return true, then return false, else return true
  for (const key in newError) {
    if (newError[key] === true) return false;
  }
  
  return true;
}

export default signInError;