import React from 'react';
// import logo from './logo.svg';
// import '../StyleSheets/SignUp.css';
import {BrowserRouter as  Router, Route, Link} from "react-router-dom";
import {Login, Logout} from "../UserFunctions.js"
import firebase from "../firebase.js";




export default class LogIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
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

    handleLogin(event) {
    
        Login(this.state.email, this.state.password);
        
        //alert("A login was submitted: " + this.state.email + ", " + this.state.password);
        
        this.setState({
          email: "",
          password: "",
        });
        
        
        event.preventDefault();
        //this.setState(this.state);
    }

    LoggedInPage() {
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
                        <Link to="/room">Room</Link>
                    </li>
                    </ul>
                </nav>
                <div>
                    You are already logged in!
                </div>
            </div>
        );
    }

    LoggedOutPage() {
        return (
            <div>
                <h1>Log In Here</h1>
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
                <div id="LoggedOutDiv">
                    <div>
                        <input name="email" type="text" value={this.state.email} onChange={this.handleChange} placeholder="Email..."/>
                    </div>
                    <div>
                        <input name="password" type="text"  value={this.state.password} onChange={this.handleChange} placeholder="Password..."/>
                    </div>
                    <div>
                        <button name="button" onClick={this.handleLogin}>Login To Account</button>
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
  