import React from 'react';
// import logo from './logo.svg';
// import '../StyleSheets/SignUp.css';
import {BrowserRouter as  Router, Route, Link, withRouter} from "react-router-dom";
import {Login, Logout} from "../UserFunctions.js"
import {Form} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import {Container} from 'react-bootstrap'
import firebase from "../firebase.js";
import Navbarin from '../components/Navbarin.js';
import Navbarout from '../components/Navbarout.js';

export default class LogIn extends React.Component {
  constructor(props) {
    super(props);
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

    handleLogin = async event => {
    
        await Login(this.state.email, this.state.password);
        //this.props.userHasAuthenticated(true);
        this.props.history.push("/");
    }

    LoggedInPage() {
        return (
            <div>
                <Navbarin />
                <div>
                    You are already logged in!
                </div>
            </div>
        );
    }

    LoggedOutPage() {
        return (
            <div>
                <Navbarout />

                <div id="LoggedOutDiv">
                <br/>
                <Container>
                    <h1>Create an Account</h1>
                    <br/>
                    <Form className="login-form">
                    <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" type="text" value={this.state.email} onChange={this.handleChange} placeholder="Email..." />
                    </Form.Group>
                    
                    <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="text" value={this.state.password} onChange={this.handleChange} placeholder="Password..." />
                    </Form.Group>
                    
                    <Button variant="primary" type="submit" name="button" onClick={this.handleLogin}>
                    Login To Account
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
  