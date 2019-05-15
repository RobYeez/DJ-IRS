import React from 'react'
//add imports to other places?
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {Logout} from "../UserFunctions.js"
import firebase from "../firebase.js";

//Landing page
export default class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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
  }

  LoggedInPage() {
    return (
      <div>
        <h1>Home</h1>
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
      </div>
    );
  }

  LoggedOutPage() {
    return (
      <div>
        <h1>Home</h1>
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