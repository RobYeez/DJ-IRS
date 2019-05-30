import React from 'react';
import FavItem from './FavItem';

export const FavList = ({videos , handleVideoSelect, handleRemoveFavorite}) => {
    const renderedVideos =  videos.map((video) => {
        return <FavItem key={video.id.videoId} video={video} handleVideoSelect={handleVideoSelect} handleRemoveFavorite={handleRemoveFavorite} />
    });

    return <div className='ui middle aligned divided list'>{renderedVideos}</div>;
};