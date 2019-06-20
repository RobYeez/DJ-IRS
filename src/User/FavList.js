import React from 'react';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import FavItem from './FavItem.js';
import FavButton from './FavButton.js';



export const FavList = ({videos , handleVideoSelect, currentComponent}) => {
    const renderedFavs =  videos.map((video) => {
        return (
            <Row>
                <Col>
                    <FavItem key={video.id.videoId} video={video} handleVideoSelect={handleVideoSelect} />
                </Col>
                <Col>
                    {(new FavButton(video, currentComponent)).render()}
                </Col>
            </Row>
            
        )
    });

    return <div className='ui middle aligned divided list'>{renderedFavs}</div>;
};