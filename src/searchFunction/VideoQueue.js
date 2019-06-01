import React from 'react';
import QueueItem from './QueueItem';

const VideoQueue = ({queueList , handleVidQSelect}) => {
    const renderedQueue =  queueList.map((video) => {
        return <QueueItem key={video.id.videoId} video={video} handleVidQSelect={handleVidQSelect} />
    });

    return <div className='ui middle aligned divided list'>{renderedQueue}</div>;
};
export default VideoQueue;