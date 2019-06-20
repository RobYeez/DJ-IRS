import React from 'react';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import FriendButton from './FriendButton.js';



export const Friendist = ({friends, currentComponent, myEmail}) => {
    const renderedFriends =  friends.map((friend) => {
        return (
            <Row>
                <Col>
                    {friend}
                </Col>
                <Col>
                    {(new FriendButton(friend, currentComponent, myEmail)).render()}
                </Col>
            </Row>
            
        )
    });

    return <div className='ui middle aligned divided list'>{renderedFriends}</div>;
};