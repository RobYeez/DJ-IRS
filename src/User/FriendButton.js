import React from 'react';
import {Button} from 'react-bootstrap';
import {RemoveFriend} from "./UserFunctions.js";

export default class FriendButton {
    constructor(friend, currentComponent, myEmail) {
        this.state = {
            friend: friend,
            component: currentComponent,
            myEmail: myEmail,
        }


        this.handleRemoveFromFriends = this.handleRemoveFromFriends.bind(this);
    }

    render() {
        if(this.state.friend) {
            return (
                <Button variant="primary" type="submit" name="button" onClick={this.handleRemoveFromFriends}>X</Button>
            )
        }

    }

    handleRemoveFromFriends() {
        RemoveFriend(this.state.friend, this.state.component, this.state.myEmail);
    }

    
}

