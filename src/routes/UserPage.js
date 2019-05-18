import React from 'react';
// import '../StyleSheets/HomePage.css';
import {BrowserRouter as  Router, Route, Link, withRouter} from "react-router-dom";
import firebase from "../firebase.js";
import {Logout} from "../UserFunctions.js";
import Navbarin from '../components/Navbarin.js';
import Navbarout from '../components/Navbarout.js';

export default class UserPage extends React.Component {
  constructor(props) {
    super(props);
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

  handleLogout = async event => {
    
    await Logout();
    //this.userHasAuthenticated(false);
    this.props.history.push("/login");
  }



  LoggedInPage() {
    return (
      <div>
        <h1>User Page</h1>
        <Navbarin />
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
        <Navbarout />
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