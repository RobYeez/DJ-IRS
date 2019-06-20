import React from 'react';
import {Button} from 'react-bootstrap';
import {SendFriend} from "./UserFunctions.js";

export default class FriendButtonSend {
    constructor(friend, myEmail, video) {
        this.state = {
            friend: friend,
            myEmail: myEmail,
            video: video
        }
        this.handleSendFromFriends = this.handleSendFromFriends.bind(this);
    }

    render() {
        if(this.state.friend) {
            return (
                <Button variant="primary" type="submit" name="button" onClick={this.handleSendFromFriends}>Send</Button>
            )
        }
    }

    handleSendFromFriends() {
        SendFriend(this.state.friend, this.state.myEmail, this.state.video);
    }

    
}

