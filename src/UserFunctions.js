import firebase from "./firebase.js";

var db = firebase.firestore();
var token = "";

const messaging = firebase.messaging();
// Add the public key generated from the console here.
messaging.usePublicVapidKey("BFVj_nB5KUhUpQbA1EYDPVHZIhs2awPNuZhM54OBS7bHk6DqYEmG6FRJdTurTS3Jp59OGCyA4RYTEcTBf1Hf5gY");

Notification.requestPermission().then(function(permission) {
  if (permission === 'granted') {
    console.log('Notification permission granted.');
    // TODO(developer): Retrieve an Instance ID token for use with FCM.
    // ...
  } else {
    console.log('Unable to get permission to notify.');
  }
}); 

// Get Instance ID token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
messaging.getToken().then(function(currentToken) {
  if (currentToken) {
    console.log(currentToken);
    token = currentToken;
    //SendTokenToServer(currentToken);
    //updateUIForPushEnabled(currentToken);
    
  } else {
    // Show permission request.
    console.log('No Instance ID token available. Request permission to generate one.');
    // Show permission UI.
    //updateUIForPushPermissionRequired();
    //setTokenSentToServer(false);
  }
}).catch(function(err) {
  console.log('An error occurred while retrieving token. ', err);
  //showToken('Error retrieving Instance ID token. ', err);
  //setTokenSentToServer(false);
});

// Callback fired if Instance ID token is updated.
messaging.onTokenRefresh(function() {
  messaging.getToken().then(function(refreshedToken) {
    console.log('Token refreshed.');
    token = refreshedToken;
    //console.log(refreshedToken);
    //SendTokenToServer(refreshedToken);
    // Indicate that the new Instance ID token has not yet been sent to the
    // app server.
    //setTokenSentToServer(false);
    // Send Instance ID token to app server.
    // ...
  }).catch(function(err) {
    console.log('Unable to retrieve refreshed token ', err);
    //showToken('Unable to retrieve refreshed token ', err);
  });
});

export function SendTokenToServer() {
  var user = firebase.auth().currentUser;
  if(user) {
    console.log(token);
    db.collection("users").doc(user.uid).update({
            User_Token: token,
          });
    }
}

messaging.onMessage(function (payload) {
  console.log("onMessage ", payload);
});

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
            User_Token: data.User_Token,
            User_Notifications: data.User_Notifications,
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
        User_Friends: [],
        User_Token: "",
        User_Notifications: [],
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
            User_Token: "",
            User_Notifications: [],
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

// export function AddFriend(addFriendText, props) {
//   var user = firebase.auth().currentUser;
//     var newInput = db.collection("users").doc(user.uid);
//       if(user) {
//         var docRef = db.collection("users").doc(user.uid);
//         docRef.get().then( function(doc) {
//           if(doc && doc.exists) {
//             //console.log(doc);
//             const data = doc.data();
//             //console.log(data);
//             newInput.update({
//               User_Friends: data.User_Friends + ", " + addFriendText
//             });      
//               props.history.push("/userpage");
//           }
//         });
//       }
//     }
    
export function AddFriend(addFriendText, props) {
  db.collection("users").where("User_Email", "==", addFriendText)
    .get()
    .then(function(check) {
        check.forEach(function() {
            // doc.data() is never undefined for query doc snapshots
            var user = firebase.auth().currentUser;
              var newInput = db.collection("users").doc(user.uid);
                if(user) {
                  var docRef = db.collection("users").doc(user.uid);
                  docRef.get().then( function(doc) {
                    if(doc && doc.exists) {
                      //console.log(doc);
                      const data = doc.data();
                      //console.log(data);
                      newInput.update({
                        User_Friends: data.User_Friends + ", " + addFriendText
                      });      
                        // props.history.push("/userpage");
                        //refresh 
                        window.location.reload();
                    }
                  });
                }
          });
    })
    .catch(function(error) {
        console.log("Error not a valid email", error);
        alert("Not a valid Email");
    });
}    
// export function DisplayFriends(props) {
//   for()
// }

