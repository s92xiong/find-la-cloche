# Find La Cloche - Documentation

Find your campsite on the La Cloche Silhouette Trail.


## About This Project

Find La Cloche is a web app that provides access to a database containing crowdsourced images and reviews for all 34 campsites along the La Cloche Silhouette Trail (LCST) in Killarney, Ontario, Canada. Inspired by [AllTrails](https://www.alltrails.com/), this app serves as a guide for backpacking enthusiasts to gain insight into the conditions of their reserved campsites.


## Frameworks

This project was built using React (Create React App) and Firebase. The Firebase services used in this project are Authentication, Firestore Database, Storage, and Hosting.


## Features
* Email Sign Up
* Email Verification
* Sign In
* Sign Out
* Google Sign In (no email verification)
* Database with users, reviews, and images


## Project setup

### Installation and Firebase setup
* Create a new Firebase project
* Go to Authentication, under *Sign-in providers* enable Email/Password and Google
* Go to *Project Overview* and register a web app
* Activate Firestore & Storage
* Fork & clone the repository
* Add Firebase credentials
  * ```npm install dotenv```
  * ```npm install firebase```
  * In the root folder of the respository, create a file called *.env.local*

The .env.local file should look like the following:

```
REACT_APP_API_KEY=apiKeyValue
REACT_APP_AUTH_DOMAIN=authDomainValue
REACT_APP_DATABASE_URL=projectIdValue
REACT_APP_PROJECT_ID=storageBucketValue
REACT_APP_STORAGE_BUCKET=messagingSenderIdValue
REACT_APP_MESSAGING_SENDER_ID=appIdValue
```

### Firestore Database Setup

Campsite data was manually added into Firestore, taken from ontarioparks.com/reservations. Developers must create a collection titled "campsites" (case sensitive) and in that collection, create 34 documents. For every document, add 4 fields:

```
1. images: []
2. index: number
3. name: "campsite name"
4. reviews: []
```

**Important Note regarding index and name properties:** 
The index property determines the order of campsites encountered when hiking clockwise along the LCST, from H1 to H54. e.g. H1 has an index of 0, H59 index: 12, H54 index: 33. For better understanding of the order of campsites, use ontarioparks.com/reservations, find a map online, or use this web app. Additionally, the name property is the full name of the campsite, e.g. "H1 Lumsden Lake". The images and reviews properties are left as empty arrays. This must be done for all 34 campsites.

For more in depth coverage of how to setup Firebase and its services, read the [documentation](https://firebase.google.com/docs/web/setup).

### Dependencies
```npm install dotenv```
```npm install firebase```
```npm install --save react-router-dom```
```npm install --save react-firebase-hooks```
```npm install react-icons --save```
```npm install react-outside-click-handler```
```npm install --save react-customizable-progressbar```
```npm install -g firebase-tools```


## Reusing generic components

**Use InputField.jsx to build your own custom client-side form validation:**
*InputField.jsx* component allow users to create their own client-side form validation, which can be adjusted to one's preferred styling.

To implement this component, the developer must initialize a useState object twice. The first object will keep track of the input fields and their string values, the second object is a set of booleans that monitors errors in the input fields. Property names must be the exact same between both state objects. For example: 

```
const [values, setValues] = { firstName: "", lastName: "", email: "", password: "" };
const [errors, setErrors] = { firstName: false, lastName: false, email: false, password: false };
```

**Important Note**: handleInputChange is a function that must return a function (e.g. function call), it uses the valueProp as an argument (property name in the state object to update, e.g. "firstName" or "email") when called inside InputField.jsx, this allows all input fields to receive their own individualized event handlers.

