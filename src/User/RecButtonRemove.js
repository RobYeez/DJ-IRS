import React from 'react';
import {Button} from 'react-bootstrap';
import {RemoveRec} from "./UserFunctions.js";

export default class RecButtonRemove {
    constructor(rec) {
        this.state = {
            rec: rec
        }
        this.handleRemoveFromRecs = this.handleRemoveFromRecs.bind(this);
    }

    render() {
        if(this.state.rec) {
            return (
                <Button variant="primary" type="submit" name="button" onClick={this.handleRemoveFromRecs}>X</Button>
            )
        }
    }

    handleRemoveFromRecs() {
        RemoveRec(this.state.rec);
    }

    
}

