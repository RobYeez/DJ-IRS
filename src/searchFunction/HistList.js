import React from 'react';
import HistItem from './HistItem';

export const HistList = ({watchHist , handleVideoSelect}) => {
    const renderedHist =  watchHist.map((video) => {
        return <HistItem key={video.id.videoId} video={video} handleVideoSelect={handleVideoSelect} />
    });

    return <div className='ui middle aligned divided list'>{renderedHist}</div>;
};

