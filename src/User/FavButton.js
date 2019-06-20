import React from 'react';
import {Button} from 'react-bootstrap';
import {RemoveFavorite} from "./UserFunctions.js";

export default class FavButton {
    constructor(video, currentComponent) {
        this.state = {
            video: video,
            component: currentComponent,
        }


        this.handleRemoveFromFavorites = this.handleRemoveFromFavorites.bind(this);
    }

    render() {
        if(this.state.video) {
            return (
                <Button variant="primary" type="submit" name="button" onClick={this.handleRemoveFromFavorites}>X</Button>
            )
        }

    }

    handleRemoveFromFavorites() {
        RemoveFavorite(this.state.video, this.state.component);
    }

    
}

