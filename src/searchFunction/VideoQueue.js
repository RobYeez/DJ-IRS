import React from 'react';
import QueueItem from './QueueItem';

const VideoQueue = ({queueList, handleQueueSelect}) => {
    const renderedQueue =  queueList.map((video) => {
        return <QueueItem key={video.id.videoId} video={video} handleQueueSelect={handleQueueSelect} />
    });

    return <div className='ui middle aligned divided list'>{renderedQueue}</div>;
};
export default VideoQueue;