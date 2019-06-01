import React from 'react';
import '../StyleSheets/video.css';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:4001');

//socket.emit in the onclick    
function updateVid(video, handleVideoSelect){
    socket.emit('get video', video);
    handleVideoSelect(video);
}

const VideoItem = ({video , handleVideoSelect, handleVidQSelect}) => {
    if(video.id) {
        return (
            <div>
                <div onClick = {() => updateVid(video, handleVideoSelect)} /*onClick={ () => handleVideoSelect(video)}*/ className=' video-item item'>
                    <img className='ui image' src={video.snippet.thumbnails.medium.url} alt={video.snippet.description}/>
                    <div className='content'>
                        <div className='header '>{video.snippet.title}</div>
                    </div>
                </div>
                <div onClick={ () => handleVidQSelect(video)} >
                    <button type="button" class="btn btn-outline-primary">Add</button>
                </div>
            </div>
        )
    }
    
};
export default VideoItem;