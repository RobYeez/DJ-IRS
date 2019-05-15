import React from 'react';
// import logo from './logo.svg';
// import '../StyleSheets/SignUp.css';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
//import UserPage from './UserPage';
import firebase from "../firebase.js";




class LogIn extends React.Component {
    render() {
        return (
            <div>
              <h1>Log In Here</h1>
              <nav>
                  <ul>
                  <li>
                      <Link to="/">Home</Link>
                  </li>
                  <li>
                      <Link to="/UserPage">User</Link>
                  </li>
                  <li>
                      <Link to="/login">Login</Link>
                  </li>
                  <li>
                      <Link to="/signup">Signup</Link>
                  </li>
                  <li>
                      <Link to="/room">Room</Link>
                  </li>
                  </ul>
              </nav>
            <div>
                <input id="logInEmail" type="email" placeholder="Email..."/>
            </div>
            <div>
                <input id="logInPassword" type="password" placeholder="Password..."/>
            </div>
            <div>
                <button id="logInButton" onClick={this.logInSubmit}>Login To Account</button>
            </div>
            </div>
          );
    }

    logInSubmit() {
        window.alert("poop");
      }

  }
  

export default LogIn;
