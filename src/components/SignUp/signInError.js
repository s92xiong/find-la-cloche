function signInError(value, inputError, setInputError) {

  // Check if all input fields are valid, if not, create error
  const newError = {...inputError};
  
  if (value.firstName.length < 1) {
    newError.firstNameError = true;
  }

  if (value.lastName.length < 1) {
    newError.lastNameError = true;
  }
  
  if (value.email.length < 1) {
    newError.emailError = true;
  }
  
  if (value.password.length < 6) {
    newError.passwordError = true;
  }
  
  setInputError(newError);

  for (const key in newError) {
    if (newError[key] === true) return false;
  }
  
  return true;
}

export default signInError;