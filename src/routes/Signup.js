import React from 'react';
// import logo from './logo.svg';
// import '../StyleSheets/SignUp.css';
import {BrowserRouter as  Router, Route, Link} from "react-router-dom";
import {CreateUser} from "../UserFunctions.js"
import {Form} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import {Container} from 'react-bootstrap'
import firebase from "../firebase.js";
import Navbarin from '../components/Navbarin.js';
import Navbarout from '../components/Navbarout.js';

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
        <Navbarin />
        <div>
          You are already signed up!
        </div>
      </div>
    );
}

LoggedOutPage() {
  return (
    <div>
      <Navbarout />

      <div>
        <br/>
        <Container>
          <h1>Create an Account</h1>
          <br/>

          <Form className="login-form">
          <Form.Group controlId="firstname">
          <Form.Label>First Name</Form.Label>
          <Form.Control name="firstname" type="text" value={this.state.firstname} onChange={this.handleChange} placeholder="Enter first name" />
          </Form.Group>

          <Form.Group controlId="lastname">
          <Form.Label>Enter last name</Form.Label>
          <Form.Control name="lastname" type="text" value={this.state.lastname} onChange={this.handleChange} placeholder="Enter last name" />
          </Form.Group>

          <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" type="text" value={this.state.email} onChange={this.handleChange} placeholder="Enter email" />
          </Form.Group>
          
          <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="text" value={this.state.password} onChange={this.handleChange} placeholder="Create password" />
          </Form.Group>
          
          <Button variant="primary" type="submit" name="submit" onClick={this.handleSubmit}>
          Submit
          </Button>
          </Form>
        </Container>
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

