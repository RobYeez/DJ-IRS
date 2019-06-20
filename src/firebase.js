// src/firebase.js
import firebase from "firebase"


// Initialize Firebase

var config = {

   apiKey: "AIzaSyDDLdilK31kiT__Oikkf9kUik7hi3OQUNE",

   authDomain: "dj-irs-a50d8.firebaseapp.com",

   databaseURL: "https://dj-irs-a50d8.firebaseio.com",

   projectId: "dj-irs-a50d8",

   storageBucket: "dj-irs-a50d8.appspot.com",

   messagingSenderId: "879850218832",

   appId: "1:879850218832:web:fb8ad0d3799d86dc"
   

};

firebase.initializeApp(config);



export default firebase;
