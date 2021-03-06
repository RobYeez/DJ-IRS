import React from 'react';
// import '../StyleSheets/HomePage.css';
import {BrowserRouter as  Router, Route, Link, withRouter} from "react-router-dom";
import {DisplayFriends, AddFriend, Logout, GetUserData, GetUser, SendTokenToServer} from "../User/UserFunctions.js"
import Navbarin from '../components/Navbarin.js';
import Navbarout from '../components/Navbarout.js';
import {Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Container, Col, Row} from 'react-bootstrap';
import {Friendist} from '../User/FriendList.js';
import {ListRecs} from '../User/ListRecs.js';

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
      User_Favorites: [],
      User_FriendsCnt: 0,
      User_Recommendations: [],

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
    AddFriend(this.state.addFriendText, this, this.state.User_Email);
    this.setState({
      addFriendText: "",
    });
    event.preventDefault();
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  DisplayFriends() {
    DisplayFriends();
  }

  handleLogout(){
    Logout(this.props);
  }

  LoggedInPage() {
    return (
      <div>
        <Navbarin handleLogout={this.handleLogout}/>
        <div id="loggedInDiv">
        <br/>
        <Container>
            <br/>
            <h1>
              Hello {this.state.User_Firstname}!
            </h1>
            <br/>
            <Row>
              <Col>
                <Form.Group controlId="addfriend">
                    <Form.Label><h3>Add Friend</h3></Form.Label>
                    <Form.Control style={{width: "40%"}} name="addFriendText" type="email" value={this.state.addFriendText} onChange={this.handleChange} placeholder="Add Friend..." />
                    <br/>
                    <div>
                      <Button name="addbtn" onClick={this.handleAdd}>Add</Button>
                    </div>
                </Form.Group>
              </Col>
              
              <Col>
                <div id="friends"><h3>Friends: </h3>
                  <ul>
                    <Friendist friends={this.state.User_Friends} currentComponent={this} myEmail={this.state.User_Email} ></Friendist>
                  </ul>
                </div>
              </Col>
            </Row>
            <Col>
              <h3>Friend Recommendations:</h3>
              <ListRecs recs={this.state.User_Recommendations}> </ListRecs>
            </Col>
        </Container>
        </div>
      </div>
    );
  }

  LoggedOutPage() {
    return (
      <div>
        <Navbarout />
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