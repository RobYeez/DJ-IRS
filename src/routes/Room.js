import React from 'react';
import SearchBar from '../searchFunction/Searchbar';
import youtube from '../apis/youtube';
import VideoList from '../searchFunction/VideoList';
import VideoDetail from '../searchFunction/VideoDetail';
import {BrowserRouter as  Router, Route, Link} from "react-router-dom";
import {GetUserData, GetUser} from "../UserFunctions.js"

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
    
            videos: [],
            selectedVideo: null
        };
    
        
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.LoggedInPage = this.LoggedInPage.bind(this);
        this.LoggedOutPage = this.LoggedOutPage.bind(this);
        this.UpdateUserData = this.UpdateUserData.bind(this);
    
      }
    

      componentDidMount() {
    
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

    handleSubmit = async (termFromSearchBar) => {
        const response = await youtube.get('/search', {
            params: {
                q: termFromSearchBar
            }
        })
        this.setState({
            videos: response.data.items
        })
    };

    handleVideoSelect = (video) => {
        this.setState({selectedVideo: video})
    }

    

      LoggedInPage() {
        return (
            <div className='ui container' style={{marginTop: '1em'}}>
                <div>
                    <h1>Room</h1>
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
                </div>
                <SearchBar handleFormSubmit={this.handleSubmit}/>
                <div className='ui grid'>
                    <div className="ui row">
                        <div className="eleven wide column">
                            <VideoDetail video={this.state.selectedVideo}/>
                        </div>
                        <div className="five wide column">
                            <VideoList handleVideoSelect={this.handleVideoSelect} videos={this.state.videos}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    LoggedOutPage() {
        return (
            <div className='ui container' style={{marginTop: '1em'}}>
                <div>
                    <h1>Room</h1>
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
                </div>
                <SearchBar handleFormSubmit={this.handleSubmit}/>
                <div className='ui grid'>
                    <div className="ui row">
                        <div className="eleven wide column">
                            <VideoDetail video={this.state.selectedVideo}/>
                        </div>
                        <div className="five wide column">
                            <VideoList handleVideoSelect={this.handleVideoSelect} videos={this.state.videos}/>
                        </div>
                    </div>
                </div>
            </div>
        );
      }


    render() {
        if (this.User) {
        // User is signed in.
            return this.LoggedInPage();
        } else {
        // No user is signed in.  
            return this.LoggedOutPage();
        }
        
    }
}
