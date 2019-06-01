import React from 'react';
import SearchBar from '../searchFunction/Searchbar';
import youtube from '../apis/youtube';
import ReactPlayer from 'react-player'
import VideoList from '../searchFunction/VideoList';
import VideoDetail from '../searchFunction/VideoDetail';
import VideoQueue from '../searchFunction/VideoQueue';
import {HistList} from '../searchFunction/HistList';
import {FavList} from '../User/FavList';
import {Container} from 'react-bootstrap'
import {BrowserRouter as  Router, Route, Link} from "react-router-dom";
import {GetUserData, GetUser, SendTokenToServer, getVideo, getList, AddFavorite} from "../User/UserFunctions.js"
import Navbarin from '../components/Navbarin.js';
import {Row} from 'react-bootstrap'
import {Col} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
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
            User_Favorites: [],
            User_FriendsCnt: 0,
    
            videos: [],
            watchHist: [],
            queueList: [],
            selectedVideo: null,
            selectedVidQ: null,

            url: null,
            pip: false,
            playing: true,
            controls: true,
            light: false,
            volume: 0.8,
            muted: false,
            played: 0,
            loaded: 0,
            duration: 0,
            playbackRate: 1.0,
            loop: true,
            videoSrc: null
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddToFavorites = this.handleAddToFavorites.bind(this);
        this.LoggedInPage = this.LoggedInPage.bind(this);
        this.LoggedOutPage = this.LoggedOutPage.bind(this);
        this.UpdateUserData = this.UpdateUserData.bind(this);
        this.onEnded = this.onEnded.bind(this);
    
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

    handleVidQSelect = (video) => {
      this.setState({selectedVidQ: video})
      var qArray = this.state.queueList.slice()

      for(var i=0; i < qArray.length; i++) {
        if(video == qArray[i]) {
          qArray.splice(i, 1) 
        }
      }
      if(qArray.length >= 5) {
        qArray = qArray.slice(1);
      }
      qArray.push(video)

      this.setState({
        queueList: qArray
      })
     }

    handleAddToFavorites(event) {
      //get the id of the selected video
      //pass it into this user function
      if(this.state.selectedVideo) {
        AddFavorite(this.state.selectedVideo);
        this.setState({
          User_Loaded: false
        });
      }
      
    }

    onEnded = () => {
      if (!this.state.queueList.length == 0) {
        this.setState({selectedVideo: this.state.queueList[0]})
        this.state.queueList.shift()

        var newArray = this.state.watchHist.slice()
        for(var i=0; i < newArray.length; i++) {
          if(this.state.selectedVideo == newArray[i]) {
            newArray.splice(i, 1) 
          }
        }
        if(newArray.length >= 5) {
          newArray = newArray.slice(1);
        }
        newArray.push(this.state.selectedVideo)
        this.setState({
          watchHist: newArray
        })
      }
     } 

      LoggedInPage() {
        const { playing, controls } = this.state
        var videoSrc = "#";
        if (this.state.selectedVideo) {
          videoSrc = `https://www.youtube.com/embed/${this.state.selectedVideo.id.videoId}`;
        }
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
                        <ReactPlayer onEnded={this.onEnded} controls={controls} url={videoSrc} playing={playing} />
                          
                        </Col>
                        
                    </Row>
                    <div id="favdiv" >
                      <Button variant="primary" type="submit" name="button" onClick={this.handleAddToFavorites}>Favorite</Button>
                      <br/><br/><br/>
                    </div>
                    
                    <Row>
                      <Col>
                        <h4>Search Results</h4>
                        <VideoList handleVideoSelect={this.handleVideoSelect} handleVidQSelect={this.handleVidQSelect} videos={this.state.videos}/>
                      </Col>
                      <Col>
                        <h4>Watch History</h4>
                        <HistList handleVideoSelect={this.handleVideoSelect} watchHist={this.state.watchHist}/>
                      </Col>
                      <Col>
                        <h4>Favorites</h4>
                        <FavList handleVideoSelect={this.handleVideoSelect} videos={this.state.User_Favorites} currentComponent={this} />
                      </Col>
                      <Col>
                        <h4>Queue</h4>
                        <VideoQueue handleVidQSelect={this.handleVidQSelect} queueList={this.state.queueList} />
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
