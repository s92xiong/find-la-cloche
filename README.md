# Find La Cloche - Documentation

This project was built using React (Create React App) and Firebase (Authentication, Firestore, Storage, and Hosting).

## About This Project

Find La Cloche is a web application that provides access to a database containing crowdsourced images and reviews for all 34 campsites along the La Cloche Silhouette Trail (LCST) in Killarney, Ontario, Canada. The LCST is a ~100 km, multi-day backpacking trail that requires significant planning and preparation to complete. Campsite reservations are specific to a single campsite per night. Ontario Parks reservation system provides little information regarding these campsites nor do they provide any campsite images in the backcountry. Therefore, this app was built to help future LCST backpackers gain insight into the conditions of their reserved campsites.

## Routes.js

Originally titled "App.js" as its default name when built via Create React App, Routes.js handles all of the routes in this project. Routes returns a BrowserRouter that encapsulates a div element with the className of "App". The App element contains: (1) A Navbar component that can be accessed on any page, and (2) A Switch tag that nests all of the major components or routes of this application.

## firebase.js

Firebase was chosen to build the backend. It uses Authentication to register users and log in/out, Firestore to store information, Storage for upload images, and hosting to deploy this application.


## Main Components

### Navbar

The Navbar component has 3 main parts: A link to an About page, a logo and title link, and a container div that conditionally renders either SignUp and Login buttons or the user name and profile profile icon, additionall enabling an on-hover dropdown list to sign out.

### About

A simple React component that details the purpose of this app and its intended audience.

### SignUp

**Email Auth:** 
Custom form validation was implemented for email authentication and requires 4 input fields: first name, last name, email, and password. Successful completion of the form renders a component named EmailVerification and sends an email verification letter to verify the user's account.



**Google Auth**
A simple and quicker alternative is for users to register via Google auth.