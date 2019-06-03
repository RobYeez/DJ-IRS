import React from 'react';
import SearchBar from '../searchFunction/Searchbar';
import youtube from '../apis/youtube';
import ReactPlayer from 'react-player'
import VideoDetail from '../searchFunction/VideoDetails';
import VideoList from '../searchFunction/VideoList';
import VideoQueue from '../searchFunction/VideoQueue';
import {HistList} from '../searchFunction/HistList';
import {FavList} from '../User/FavList';
import {BrowserRouter as  Router, Route, Link} from "react-router-dom";
import {GetUserData, GetUser, SendTokenToServer, getVideo, getList, AddFavorite, getPP, getWatchHist, getQueue, getVolume} from "../User/UserFunctions.js"
import Navbarin from '../components/Navbarin.js';
import {Container, Row, Col, Button, ButtonToolbar, Dropdown, ButtonGroup} from 'react-bootstrap'
import openSocket from 'socket.io-client';
import Duration from "../searchFunction/Duration.js"
import '../StyleSheets/music.css'
import { FriendListDrop } from '../User/FriendListDrop.js';
//import Seeker from "../searchFunction/Seek.js"
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
            volume: 1.0,
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

    load = url => {
      this.setState({
        url,
        played: 0,
        loaded: 0,
        pip: false
      })
    }
    
    componentDidMount() {
      //document.title = "DJ-IRS";
      this.timerID = setInterval(
        () => this.UpdateUserData(),
        100
      ); //updates every 100 ms
      this.timerID = setInterval(
        () => this.update(),
        100
      );
      this.timerID = setInterval(
        () => this.updateVolume(),
        1500
      )
    }

    // componentDidUpdate(prevProps){
    //   if(this.props.data !== prevProps.data){
    //     getVolume(this);
    //   }
    // }

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

    //Update various items on the room page
    //Called every 100ms, waits for socket emits
    update() { getList(this); getVideo(this); getPP(this); getWatchHist(this); getQueue(this); this.forceUpdate(); }

    updateVolume() {
      getVolume(this);
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
        if(video === newArray[i]) {
          newArray.splice(i, 1) 
        }
      }
      if(newArray.length >= 5) {
        newArray = newArray.slice(1);
      }
      newArray.push(video)
      socket.emit('update history', newArray)
      this.setState({
        watchHist: newArray
      })
    }

    handleVidQSelect = (video) => {
      this.setState({selectedVidQ: video})
      var qArray = this.state.queueList.slice()

      for(var i=0; i < qArray.length; i++) {
        if(video === qArray[i]) {
          qArray.splice(i, 1) 
        }
      }
      if(qArray.length >= 5) {
        qArray = qArray.slice(1);
      }
      qArray.push(video)

      socket.emit("update queue", qArray)
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

    playPause = () => {
      socket.emit("changePP", !this.state.playing)
      this.setState({ playing: !this.state.playing })
    }
  
    onPlay = () => {
      console.log('onPlay')
      this.setState({ playing: true })
    }
  
    onPause = () => {
      console.log('onPause')
      this.setState({ playing: false })
    } 
    
    setVolume = e => {
      socket.emit('update volume', parseFloat(e.target.value))
      this.setState({ volume: parseFloat(e.target.value) })
    }

    onSeekMouseDown = e => {
      this.setState({ seeking: true })
    }
  
    onSeekChange = e => {
      this.setState({ played: parseFloat(e.target.value) })
    }
  
    onSeekMouseUp = e => {
      this.setState({ seeking: false })
      this.player.seekTo(parseFloat(e.target.value))
    }

    seekTo = (fraction, type) => {
      if (!this.player) return null
      this.player.seekTo(fraction, type)
    }

    onProgress = state => {
      console.log('onProgress', state)
      // We only want to update time slider if we are not currently seeking
      if (!this.state.seeking) {
        this.setState(state)
      }
    }

    onEnded = () => {
      if (!this.state.queueList.length === 0) {
        this.setState({selectedVideo: this.state.queueList[0]})
        this.state.queueList.shift()

        var newArray = this.state.watchHist.slice()
        for(var i=0; i < newArray.length; i++) {
          if(this.state.selectedVideo === newArray[i]) {
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

    onDuration = (duration) => {
      console.log('onDuration', duration)
      this.setState({ duration })
    }

    LoggedInPage() {
      const { playing, played, controls, duration, volume } = this.state
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
                      <VideoDetail video={this.state.selectedVideo} />
                    </Col>
                  <Col>
                  <div class="now playing" id="music" 
                    style={{
                    position: 'absolute', left: '50%', top: '50%',
                    transform: 'translate(-50%, -50%)'}}>
                      <span class="bar bar1"></span>
                      <span class="bar bar2"></span>
                      <span class="bar bar3"></span>
                      <span class="bar bar4"></span>
                      <span class="bar bar5"></span>
                      <span class="bar bar6"></span>
                      <span class="bar bar7"></span>
                      <span class="bar bar8"></span>
                    </div>
                    <div className="ui embed" style={{position: 'absolute', left:'50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
                      <ReactPlayer onPlay={this.onPlay} onPause={this.onPause} onSeek={e => console.log('onSeek', e)} onProgress={this.onProgress} onDuration={this.onDuration} 
                      width='0px' height='0px' controls={controls} url={videoSrc} playing={playing} volume={volume} />
                    </div>
                  </Col>
                  <Col>
                    <ButtonToolbar>
                      <Button variant="dark" onClick={this.playPause}>{playing ? 'Pause' : 'Play'}</Button>
                    </ButtonToolbar>
                    <br />
                    <input type='range' min={0} max={1} step='any'
                      value={played} onMouseDown={this.onSeekMouseDown} onChange={this.onSeekChange} onMouseUp={this.onSeekMouseUp}
                    />
                    <br /><Duration seconds={duration * played} /> / <Duration seconds={duration} />
                    <br />
                    <br />
                    <p>Volume</p>
                    <input type='range' min={0} max={1} step='any' 
                      value={volume} onChange={this.setVolume} 
                    />
                  </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col>
                    <ButtonGroup>
                      <div id="favdiv" >
                        <Button variant="primary" type="submit" name="button" onClick={this.handleAddToFavorites}>Favorite</Button>
                      </div>
                      &nbsp;
                      <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">Share</Dropdown.Toggle>
                        <Dropdown.Menu>
                          <FriendListDrop friends={this.state.User_Friends}></FriendListDrop>
                          {/* <Dropdown.Item href="#/action-1">Robert</Dropdown.Item>
                          <Dropdown.Item href="#/action-2">Dylan</Dropdown.Item>
                          <Dropdown.Item href="#/action-3">Stephanie</Dropdown.Item> */}
                        </Dropdown.Menu>
                      </Dropdown>
                      </ButtonGroup>
                      <br /><br />
                    </Col>
                  </Row>
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
