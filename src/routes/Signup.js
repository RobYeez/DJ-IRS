import React from 'react';
// import logo from './logo.svg';
// import '../StyleSheets/SignUp.css';
import {BrowserRouter as  Router, Route, Link} from "react-router-dom";
import {CreateUser} from "../UserFunctions.js"
import firebase from "../firebase.js";




export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(event) {
    

    
    CreateUser( this.state.firstname, this.state.lastname, this.state.email, this.state.password, this.props)

    //alert("A sign up was submitted: " + this.state.firstname + ", " + this.state.lastname + ", " + this.state.email + ", " + this.state.password);
    
    this.setState({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    });

    event.preventDefault();
  }





  LoggedInPage() {
    return (
      <div>
        <h1>Sign Up</h1>
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
          You are already signed up!
        </div>
      </div>
    );
}

LoggedOutPage() {
  return (
    <div>
      <h1>Sign Up</h1>
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
      <div>
        <input name="firstname" type="text" value={this.state.firstname} onChange={this.handleChange} placeholder="First"/>
      </div>
      <div>
        <input name="lastname" type="text" value={this.state.lastname} onChange={this.handleChange} placeholder="Last"/>
      </div>
      <div>
        <input name="email" type="text" value={this.state.email} onChange={this.handleChange} placeholder="Email..."/>
      </div>
      <div>
        <input name="password" type="text" value={this.state.password} onChange={this.handleChange} placeholder="Password..."/>
      </div>
      <div>
        <button name="submit" onClick={this.handleSubmit} >Submit</button>
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

