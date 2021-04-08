# Find La Cloche - Documentation
Find your campsite on the [La Cloche Silhouette Trail](https://findlacloche.com).


## About This Project
Find La Cloche is a web app that provides access to a database containing crowdsourced images and reviews for all 34 campsites along the La Cloche Silhouette Trail (LCST) in Killarney, Ontario, Canada. Inspired by [AllTrails](https://www.alltrails.com/), this app serves as a guide for backpacking enthusiasts to gain insight into the conditions of their reserved campsites.


## Frameworks
This project was built using React (Create React App) and Firebase. The Firebase services used in this project are Authentication, Firestore, Storage, and Hosting.


## Features
* Email Sign Up
* Email Verification
* Sign In
* Sign Out
* Google Sign In (no email verification)
* Database with users
* Add and delete reviews
* Upload images


## Project setup

### Dependencies
```
npm install dotenv
npm install firebase
npm install --save react-router-dom
npm install --save react-firebase-hooks
npm install react-icons --save
npm install react-outside-click-handler
npm install --save react-customizable-progressbar
npm install -g firebase-tools
```

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

The .env.local file should have the following:

```
REACT_APP_API_KEY=apiKeyValue
REACT_APP_AUTH_DOMAIN=authDomainValue
REACT_APP_DATABASE_URL=projectIdValue
REACT_APP_PROJECT_ID=storageBucketValue
REACT_APP_STORAGE_BUCKET=messagingSenderIdValue
REACT_APP_MESSAGING_SENDER_ID=appIdValue
```

### Setting up your Firestore Database

Campsite data was manually added into Firestore, taken from ontarioparks.com/reservations. Create a collection titled "campsites" (case sensitive) and in that collection, create 34 documents. For every document, add 4 fields:

```
1. images: []
2. index: number
3. name: "campsite name"
4. reviews: []
```

Your document should look like the following: 

![Image of Firebase document fields](https://firebasestorage.googleapis.com/v0/b/find-la-cloche-campsite.appspot.com/o/Screen%20Shot%202021-04-05%20at%2010.52.01%20PM.png?alt=media&token=621bebe8-964d-4096-ac49-ed53332b8637)

**Important Note regarding index and name properties:** 
The index property determines the order of campsites encountered when hiking clockwise along the LCST, from H1 to H54. e.g. H1 has an index of 0, H59 index: 12 (because it is 13 campsites away from the start of the trail), H54 index: 33. For better understanding of the order of campsites, use the Killarney map on ontarioparks.com/reservations or use this web app. Additionally, the name property is the full name of the campsite, e.g. "H1 Lumsden Lake". The images and reviews properties are left as empty arrays.

For more in depth information on how to setup Firebase and its services, read the [documentation](https://firebase.google.com/docs/web/setup).


## Reusable generic components

### InputField.jsx:

Create your own custom, client-side form validation.

To implement this component, the developer must initialize a useState object twice. The first object will keep track of the input fields and their string values, the second object is a set of booleans that monitors errors in the input fields. Property names must be the exact same between both state objects. For example:

```
const [values, setValues] = { firstName: "", lastName: "", email: "", password: "" };
const [errors, setErrors] = { firstName: false, lastName: false, email: false, password: false };
```

*InputField* takes seven props: 
1. handleInputChange - a function that returns a function, it uses the valueProp argument (property name in the state object to update, e.g. "firstName" or "email") when called inside InputField.jsx, this allows all input fields to receive their own individualized event handlers.
2. error - the useState errors object
3. classInput - className that you want to use for styling purposes
4. inputType - determines the type of input (e.g. text, password, email)
5. placeholderText - custom placeholder text
6. errorMessage - the error message you want to render when an error occurs
7. valueProp - the value property of the input field you want to target (e.g. firstName, lastName, email, or password)

### StarRating.jsx:

Implement a 5-star rating system where users can pick a star value ranging from 1 to 5.

Requirements:
1. ```npm install react-icons --save```
2. Depending on your component heirarchy, you want to initialize a variable state somewhere up the component chain:
```const [rating, setRating] = useState(null);```

3. Create a function titled *handleRating* which takes in a single arguement (ratingValue). *handleRating* returns another an event handler function. This event handler will handle what to do when a user clicks on any of the 5 stars: 

```
const handleRating = (ratingValue) => {
  const handler = () => {
    // Execute some code when the user clicks on a star
  };
  return handler;
};
```

*StarRating* takes two props: 
1. rating - the useState rating value
2. handleRating - the function that returns an event handler previously discussed above

### Use AverageRating.jsx to render 5 stars:

Displays the average 5-star rating, also displays a half-gold star if the average value is rounded to the nearest 0.5.

Requirements:
1. The developer must be using a 5-star rating system.
2. ```npm install react-icons --save```

*AverageRating* takes two props:
1. average - the average value of all ratings from a 5-star review, this value must be rounded to the nearest 0.5 value
2. starSize - value in pixels that determines the size of the star, changing this value will change the size of the stars rendered to the screen