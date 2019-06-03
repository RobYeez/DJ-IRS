import React from 'react';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
// import {Container, Row, Col, Button, ButtonToolbar, Dropdown, ButtonGroup} from 'react-bootstrap'
import {Dropdown} from 'react-bootstrap';
import sendFriend from './UserFunctions.js';

export const FriendListDrop = ({friends}) => {
    const renderedFriends =  friends.map((friend) => {
        return (
            <Row>
                <Dropdown.Item>{friend}</Dropdown.Item>

            </Row>
            
        )
    });

    return <div className='ui middle aligned divided list'>{renderedFriends}</div>;
};