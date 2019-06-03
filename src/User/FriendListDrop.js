import React from 'react';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
// import {Container, Row, Col, Button, ButtonToolbar, Dropdown, ButtonGroup} from 'react-bootstrap'
import {Dropdown} from 'react-bootstrap';
import FriendButtonSend from './FriendButtonSend.js';

    export const FriendListDrop = ({friends, myEmail, video}) => {
    const renderedFriends =  friends.map((friend) => {
        return (
            <Row>
                <Dropdown.Item>{friend}{(new FriendButtonSend(friend, myEmail, video)).render()} </Dropdown.Item>
            </Row>
            
        )
    });

    return <div className='ui middle aligned divided list'>{renderedFriends}</div>;
};