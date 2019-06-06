import React from 'react';
import '../StyleSheets/video.css';

const QueueItem = ({video , handleQueueSelect}) => {
    return (
        <div onClick={ () => handleQueueSelect(video)} className=' video-item item'>
            <img className='ui image' src={video.snippet.thumbnails.medium.url} alt={video.snippet.description}/>
            <div className='content'>
                <div className='header '>{video.snippet.title}</div>
            </div>
        </div>

    )
};
export default QueueItem;