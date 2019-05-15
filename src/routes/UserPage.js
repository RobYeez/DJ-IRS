import React from 'react';
// import '../StyleSheets/HomePage.css';
import {BrowserRouter as  Router, Route, Link} from "react-router-dom";
import firebase from "../firebase.js";
import {Logout} from "../UserFunctions.js";



export default class UserPage extends React.Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
    };

    

    this.handleChange = this.handleChange.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.LoggedInPage = this.LoggedInPage.bind(this);
    this.LoggedOutPage = this.LoggedOutPage.bind(this);

  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleLogout(event) {
    
    Logout();
    
    
    event.preventDefault();
    //this.setState(this.state);
  }



  LoggedInPage() {
    return (
      <div>
        <h1>User Page</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/UserPage">User</Link>
            </li>
            <li>
              <Link to="/room">Room</Link>
            </li>
          </ul>
        </nav>
        <div id="loggedInDiv">
            <div>
              Hello user!
            </div>
            <div>
              <button name="button" onClick={this.handleLogout}>Logout</button>
            </div>
        </div>
      </div>
    );
  }

  LoggedOutPage() {
    return (
      <div>
        <h1>User Page</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </ul>
        </nav>
        <div id="notLoggedInDiv">
            <div>
              You are not logged in!
            </div>
        </div>
      </div>
    );
  }
    render() {
      var user = firebase.auth().currentUser;

      if (user) {
      // User is signed in.
          return this.LoggedInPage();
      } else {
      // No user is signed in.  
          return this.LoggedOutPage();
      }
    }
}