import React from 'react';
import '../StyleSheets/video.css';
import openSocket from 'socket.io-client';
import {Button} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
const socket = openSocket('http://localhost:4001');

//socket.emit in the onclick    
function updateVid(video, handleVideoSelect){
    socket.emit('get video', video);
    handleVideoSelect(video);
}

const VideoItem = ({video , handleVideoSelect, handleRemoveFavorite}) => {
    if(video.id) {
        return (
            <Row>
                <Col>
                    <div onClick = {() => updateVid(video, handleVideoSelect)} /*onClick={ () => handleVideoSelect(video)}*/ className=' video-item item'>
                        <img className='ui image' src={video.snippet.thumbnails.medium.url} alt={video.snippet.description}/>
                        <div className='content'>
                            <div className='header '>{video.snippet.title}</div>
                        </div>
                    </div>
                </Col>
                <Col>
                    <Button variant="primary" type="submit" name="button" onClick={handleRemoveFavorite(video)}>X</Button>
                </Col>
                
                
            </Row>
            
        )
    }
    
};
export default VideoItem;