# Find La Cloche - Documentation

This project was built using React (Create React App) and Firebase (Authentication, Firestore, Storage, and Hosting).


## About This Project

Find La Cloche is a web application that provides access to a database containing crowdsourced images and reviews for all 34 campsites along the La Cloche Silhouette Trail (LCST) in Killarney, Ontario, Canada. The LCST is a ~100 km, multi-day backpacking trail that requires significant planning and preparation to complete. Campsite reservations are specific to a single campsite per night. Ontario Parks reservation system provides little information regarding these campsites nor do they provide any campsite images in the backcountry. Therefore, this app was built to help future LCST backpackers gain insight into the conditions of their reserved campsites.


## Important SRC Files

### Routes.js

Originally titled "App.js" as its default name when built via Create React App, Routes.js handles all of the routes in this project. Routes returns a BrowserRouter that encapsulates a div element with the className of "App". The App element contains: (1) A Navbar component that can be accessed on any page, and (2) A Switch tag that nests all of the major components.

### firebase.js

Firebase was chosen to build the backend. It uses Authentication to register users and log in/out, Firestore to store information, Storage for upload images, and hosting to deploy this application. Configuration is accomplished in the firebase.js file with the api key hidden using the .env.local file.


## Main Components

### Navbar

The Navbar component has three main parts: A link to an About page, a logo and title link, and a container div that conditionally renders either SignUp and Login buttons or the user name with a profile icon. Hovering over the username or icon will render a dropdown list showing a Home button and Signout button (SignoutDropdown.jsx).

### About

A simple React component that details the purpose of this app and its intended audience.

### SignUp

**Email Auth:** 
Custom form validation was implemented for email authentication and requires 4 input fields: first name, last name, email, and password. Successful completion of the form renders a component named EmailVerification and sends an email verification letter to verify the user's account.

**How to use InputField.jsx to build your own custom client-side form validation:**
Using the component InputField.jsx will allow users to create their own client-side form validation, which they can adjust to their preferred styling and design.

To implement this component, the developer must initialize a useState object twice: one object will keep track of all the input fields and their string values, the other is an object of booleans that track their validity.

```
const [values, setValues] = { firstName: "", lastName: "", email: "", password: "" };
const [errors, setErrors] = { firstName: false, lastName: false, email: false, password: false };
```

The InputField function component takes in 7 arguments
1. handleInputChange - updates {values} and {errors}
2. error - renders error message below input field
3. classInput - a className for the input field 
4. inputType - 
5. placeholderText
6. errorMessage - error message the user wants to display
7. valueProp - 

An additional eventHandler function is required to update state to reflect the status of the input fields being valid or invalid. This function should be written by the developer as every project have specific conditions for what is  .

**Google Auth**
A simple and quicker alternative is for users to register via Google auth.