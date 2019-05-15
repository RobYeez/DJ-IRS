import React from 'react'
import firebase from "./firebase.js";

export function CreateUser( firstname, lastname, email, password) {
        firebase.auth().createUserWithEmailAndPassword(email, password);
}


