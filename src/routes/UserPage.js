import React from 'react';
// import '../StyleSheets/HomePage.css';
import {BrowserRouter as  Router, Route, Link, withRouter} from "react-router-dom";
import {/*DisplayFriends,*/ AddFriend, Logout, GetUserData, GetUser, SendTokenToServer} from "../UserFunctions.js";
import Navbarin from '../components/Navbarin.js';
import Navbarout from '../components/Navbarout.js';
import {Form} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import {Container} from 'react-bootstrap'

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
      User_Token: "",
      User_Notifications: [],

      addFriendText: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.LoggedInPage = this.LoggedInPage.bind(this);
    this.LoggedOutPage = this.LoggedOutPage.bind(this);
    this.UpdateUserData = this.UpdateUserData.bind(this);
    this.handleAdd = this.handleAdd.bind(this);

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

  handleAdd(event) {
    AddFriend(this.state.addFriendText, this.props);
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

  // displayFriends() {
  //   DisplayFriends(this.props);
  // }

  LoggedInPage() {
    return (
      <div>
        <Navbarin />
        <div id="loggedInDiv">
        <br/>
        <Container>
            <h1>User Page</h1>
            <br/>
            <div>
              Hello {this.state.User_Firstname}!
            </div>
            <br/>
            <Form.Group controlId="addfriend">
                <Form.Label>Add Friend</Form.Label>
                <Form.Control name="addFriendText" type="email" value={this.state.addFriendText} onChange={this.handleChange} placeholder="Add Friend..." />
                <div>
                  <Button name="addbtn" onClick={this.handleAdd}>Add</Button>
                </div>
            </Form.Group>
            
            {/* Display Friends */}
            {/* <div>
            <Button name="displayFriends" onClick={this.displayFriends}> Display Friends</Button>
            </div> */}

            <br/>
            <div>
              <Button name="button" onClick={this.handleLogout}>Logout</Button>
            </div>
        </Container>
        </div>
      </div>
    );
  }

  LoggedOutPage() {
    return (
      <div>
        <Navbarin />
        <div id="loggedOutDiv">
          <br/>
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