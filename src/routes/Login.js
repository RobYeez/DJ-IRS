import React from 'react';
// import logo from './logo.svg';
// import '../StyleSheets/SignUp.css';
import {BrowserRouter as  Router, Route, Link, withRouter} from "react-router-dom";
import {Login, GetUserData, GetUser, SendTokenToServer} from "../UserFunctions.js"
import {Form} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import {Container} from 'react-bootstrap'
import Navbarin from '../components/Navbarin.js';
import Navbarout from '../components/Navbarout.js';

export default class LogIn extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        User: null,
          User_Loaded: false,
          User_Firstname: "",
          User_Lastname: "",
          User_Email: "",
          User_Friends: [],
          User_Token: "",
          User_Notifications: [],
          
          email: "",
          password: "",
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleLogin = this.handleLogin.bind(this);
      this.LoggedInPage = this.LoggedInPage.bind(this);
      this.LoggedOutPage = this.LoggedOutPage.bind(this);
      this.UpdateUserData = this.UpdateUserData.bind(this);
  
      } 
  
      componentDidMount() {
        //document.title = "DJ-IRS";
      
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
            SendTokenToServer();
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
  
      handleLogin(event) {
      
          Login(this.state.email, this.state.password, this.props);
          event.preventDefault();
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
                    <h1>Log In</h1>
                    <br/>
                    <Form className="login-form">
                    <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" type="text" value={this.state.email} onChange={this.handleChange} placeholder="Email..." />
                    </Form.Group>
                    
                    <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" value={this.state.password} onChange={this.handleChange} placeholder="Password..." />
                    </Form.Group>
                    
                    <Button variant="primary" type="submit" name="button" onClick={this.handleLogin}>
                    Login
                    </Button>
                    </Form>
                </Container>
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
  