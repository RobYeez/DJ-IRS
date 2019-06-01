import React from 'react';
import VideoItem from './VideoItem';

const VideoList = ({videos , handleVideoSelect, handleVidQSelect}) => {
    const renderedVideos =  videos.map((video) => {
        return <VideoItem key={video.id.videoId} video={video} handleVideoSelect={handleVideoSelect} handleVidQSelect={handleVidQSelect} />
    });

    return <div className='ui middle aligned divided list'>{renderedVideos}</div>;
};
export default VideoList;