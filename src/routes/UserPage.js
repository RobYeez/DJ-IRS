import React from 'react';
// import '../StyleSheets/HomePage.css';
import {BrowserRouter as  Router, Route, Link, withRouter} from "react-router-dom";
import firebase from "../firebase.js";
import {Logout, GetUserData, GetUser} from "../UserFunctions.js";
import Navbarin from '../components/Navbarin.js';
import Navbarout from '../components/Navbarout.js';

export default class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      User: null,
      User_Loaded: false,
      User_Firstname: "",
      User_Lastname: "",
      User_Email: "",
      User_Friends: [],
    };

    

    this.handleChange = this.handleChange.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.LoggedInPage = this.LoggedInPage.bind(this);
    this.LoggedOutPage = this.LoggedOutPage.bind(this);
    this.UpdateUserData = this.UpdateUserData.bind(this);

  }

  componentDidMount() {
    
    this.timerID = setInterval(
      () => this.UpdateUserData(),
      100
    ); //updates every 100 ms
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }


  UpdateUserData() {
    var user = GetUser();

    if( (user && !this.state.User_Loaded) || (!user && this.state.User_Loaded) ) {
      GetUserData(this);
      this.forceUpdate();
    }
  }



  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleLogout(){
    
    Logout(this.props);
  }



  LoggedInPage() {
    return (
      <div>
        <Navbarin />
        <h1>User Page</h1>
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
      
    if (this.state.User) {
    // User is signed in.
        return this.LoggedInPage();
    } else {
    // No user is signed in.  
        return this.LoggedOutPage();
    }
  }
}