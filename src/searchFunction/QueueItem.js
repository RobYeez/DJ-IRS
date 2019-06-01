import React from 'react';
import '../StyleSheets/video.css';

const QueueItem = ({video , handleVidQSelect}) => {
    return (
        <div onClick={ () => handleVidQSelect(video)} className=' video-item item'>
            <img className='ui image' src={video.snippet.thumbnails.medium.url} alt={video.snippet.description}/>
            <div className='content'>
                <div className='header '>{video.snippet.title}</div>
            </div>
        </div>

    )
};
export default QueueItem;