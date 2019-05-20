import React from 'react';
import SearchBar from '../searchFunction/Searchbar';
import youtube from '../apis/youtube';
import VideoList from '../searchFunction/VideoList';
import VideoDetail from '../searchFunction/VideoDetail';
import HistList from '../searchFunction/HistList';
import {Container} from 'react-bootstrap'
import {BrowserRouter as  Router, Route, Link} from "react-router-dom";
import {GetUserData, GetUser, SendTokenToServer, getVideo, getList} from "../UserFunctions.js"
import Navbarin from '../components/Navbarin.js';
import {Row} from 'react-bootstrap'
import {Col} from 'react-bootstrap'
import openSocket from 'socket.io-client'; 
const socket = openSocket('http://localhost:4001');

export default class Room extends React.Component {
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
            User_FriendsCnt: 0,
    
            videos: [],
            watchHist: [],
            selectedVideo: null
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        this.timerID = setInterval(
          () => this.updateVideo(),
          100
        );
        this.timerID = setInterval(
          () => this.updateList(),
          100
        );
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

      updateList() { 
        getList(this);
        this.forceUpdate(); 
      }

      updateVideo() {
        getVideo(this);
        this.forceUpdate();
      }

      handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
      }

    handleSubmit = async (termFromSearchBar) => {
        const response = await youtube.get('/search', {
            params: {
                q: termFromSearchBar
            }
        })
        //tell server to update video list
        socket.emit('display list', response.data.items)
        this.setState({
            videos: response.data.items
        })
    };

    handleVideoSelect = (video) => {
      //let server know to update selected video
      socket.emit('get video', video)
      this.setState({selectedVideo: video})
      //window.location.reload();
      var newArray = this.state.watchHist.slice()
      for(var i=0; i < newArray.length; i++) {
        if(video == newArray[i]) {
          newArray.splice(i, 1) 
        }
      }
      if(newArray.length >= 5) {
        newArray = newArray.slice(1);
      }
      newArray.push(video)
      this.setState({
        watchHist: newArray
      })
    }

      LoggedInPage() {
        return (
          <div>
            <Navbarin />
            <div id="loggedOutDiv">
              <br/>
              <Container>
                <div>
                    <h1>Room</h1>
                </div>
                <SearchBar handleFormSubmit={this.handleSubmit}/>

                    <Row>
                        <Col>
                          <VideoDetail video={this.state.selectedVideo}/>
                        </Col>
                    </Row>

                    <Row>
                      <Col>
                        <VideoList handleVideoSelect={this.handleVideoSelect} videos={this.state.videos}/>
                      </Col>
                        <h4>Watch History</h4>
                      <Col>
                        <HistList handleVideoSelect={this.handleVideoSelect} watchHist={this.state.watchHist}/>
                      </Col>
                    </Row>
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
              <Container>
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
