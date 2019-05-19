import React from 'react';
import VideoItem from './VideoItem';

const HistList = ({watchHist , handleVideoSelect}) => {
    const renderedHist =  watchHist.map((video) => {
        return <VideoItem key={video.id.videoId} video={video} handleVideoSelect={handleVideoSelect} />
    });

    return <div className='ui middle aligned divided list'>{renderedHist}</div>;
};
export default HistList;