import firebase from "./firebase.js";
//require('firebase/<PACKAGE>');
//import { database } from "firebase";

var db = firebase.firestore();


firebase.auth().onAuthStateChanged(function(USER) {
  var user = USER;
    //console.log(user);

    if (user) {
      // User is signed in.
        

    } else {
      // No user is signed in.
    }
});

export function GetUser() {
  var user = firebase.auth().currentUser;
  return user;
}

export function GetUserData(currentComponent) {
  var user = firebase.auth().currentUser;

    if(user) {
      var docRef = db.collection("users").doc(user.uid);
      docRef.get().then( function(doc) {
        if(doc && doc.exists) {
          //console.log(doc);
          const data = doc.data();
          //console.log(data);
          currentComponent.setState( {
            User: user,
            User_Loaded: true,
            User_Firstname: data.User_Firstname,
            User_Lastname: data.User_Lastname,
            User_Email: data.User_Email,
            User_Friends: data.User_Friends,
          });
        }
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...

        alert("Error Code: " + errorCode + "\n" + errorMessage);
      });
      
    }else {
      currentComponent.setState( {
        User: null,
        User_Loaded: false,
        User_Firstname: "",
        User_Lastname: "",
        User_Email: "",
        User_Friends: "",
      });
    }
    

}

export function CreateUser(firstname, lastname, email, password, props) {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(cred => {
          return db.collection("users").doc(cred.user.uid).set({
            User_Firstname: firstname,
            User_Lastname: lastname,
            User_Email: email,
            User_Friends: [],
          });
          
        }).then( function() {
            //create user successful
            alert("Created User");
            props.history.push("/userpage");
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...

            alert("Error Code: " + errorCode + "\n" + errorMessage);

          });
}

export function Login(email, password, props) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
      //sign in successful
      alert("Logged In");
      props.history.push("/userpage");
      
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...

        alert("Error Code: " + errorCode + "\n" + errorMessage);
      });
      
}


export function Logout(props) {
    
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
        alert("Logged Out");
        props.history.push("/login");
        
      }).catch(function(error) {
        // An error happened.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("Error Code: " + errorCode + "\n" + errorMessage);
      });
      
      
}


