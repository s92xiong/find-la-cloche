# Find La Cloche - Documentation

This project was built using React (Create React App) and Firebase (Authentication, Firestore, Storage, and Hosting).

## About This Project

**What does this project do? Why does it exist?**
Find La Cloche is a web application that provides access to a database containing crowdsourced images and reviews for all 34 campsites along the La Cloche Silhouette Trail (LCST) in Killarney, Ontario, Canada. The LCST is a ~100 km, multi-day backpacking trail that requires significant planning and preparation to complete. Campsite reservations are specific to a single campsite per night. Ontario Parks reservation system provides little information regarding these campsites nor do they provide any campsite images in the backcountry. Therefore, this app was built to help future LCST backpackers gain insight into the conditions of their reserved campsites.

## Routes.js

Originally titled "App.js" as its default name when built via Create React App, Routes.js handles all of the routes in this project. Routes returns a BrowserRouter that encapsulates a div element with the className of "App". The App element contains: (1) A Navbar component that can be accessed on any page, and (2) A Switch tag that nests all of the major components or routes of this application.