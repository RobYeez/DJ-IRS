import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {GetUserData, GetUser} from "../UserFunctions.js"
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
      User: null,
      User_Loaded: false,
      User_Firstname: "",
      User_Lastname: "",
      User_Email: "",
      User_Friends: [],
    };

    this.handleChange = this.handleChange.bind(this);
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
    //console.log(this.state);
  }


  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
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
    if (this.state.User) {
    // User is signed in.
        return this.LoggedInPage();
    } else {
    // No user is signed in.  
        return this.LoggedOutPage();
    }
    
  } 
}