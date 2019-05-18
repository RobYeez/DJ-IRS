import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {Logout} from "../UserFunctions.js"
import homebkgrnd from '../images/homebkgrnd.jpg';
import firebase from "../firebase.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbarin from '../components/Navbarin.js';
import Navbarout from '../components/Navbarout.js';

//Landing page
export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
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
        <Navbarin />

      </div>
    );
  }

  LoggedOutPage() {
    return (
      <div>
        <Navbarout />
        <br />
        <div align='center'><h1>DJ-IRS</h1></div>
        <div align='center'><h4>Find new music. Make new friends.</h4></div>
        <br />
        <div align='center'><img src={homebkgrnd} width='500' height='300'/></div>
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