import firebase from "./firebase.js";

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      
        document.getElementById("loggedInDiv").style.display = "block";
        document.getElementById("LoggedOutDiv").style.display = "none";

    } else {
      // No user is signed in.
        document.getElementById("loggedInDiv").style.display = "none";
        document.getElementById("LoggedOutDiv").style.display = "block";
    }
  });

export function CreateUser(firstname, lastname, email, password, props) {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
          //create user successful
          alert("Created User");
          props.history.push("/UserPage");
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...

            alert("Error Code: " + errorCode + "\n" + errorMessage);
          });
}

export function Login(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
      //sign in successful
      alert("Logged In");
      
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...

        alert("Error Code: " + errorCode + "\n" + errorMessage);
      });
      
}


export function Logout() {
    
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
        alert("Logged Out");
        
      }).catch(function(error) {
        // An error happened.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("Error Code: " + errorCode + "\n" + errorMessage);
      });
      
      
}


