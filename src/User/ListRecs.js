import React from 'react';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import RecButtonRemove from './RecButtonRemove.js';



export const ListRecs = ({recs}) => {
    const renderedRecs =  recs.map((rec) => {
        return (
            <Row>
                <Col>
                    {rec}
                </Col>
                <Col>
                    {(new RecButtonRemove(rec)).render()}
                </Col>
            </Row>
        )
    });
    return <div className='ui middle aligned divided list'>{renderedRecs}</div>;
};