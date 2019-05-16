import React from 'react';
import SearchBar from '../searchFunction/Searchbar';
import youtube from '../apis/youtube';
import VideoList from '../searchFunction/VideoList';
import VideoDetail from '../searchFunction/VideoDetail';
import {BrowserRouter as  Router, Route, Link} from "react-router-dom";

export default class Room extends React.Component {
    state = {
        videos: [],
        selectedVideo: null
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

    render() {
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
        )
    }
}