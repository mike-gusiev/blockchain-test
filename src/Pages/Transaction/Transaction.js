import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Container, Row, Col, Card, Table, ListGroup} from 'react-bootstrap';
import moment from 'moment';

import * as singleTransaction from '../../ducks/singleTransaction';
import './Transaction.css';

const Transaction = (props) => {

    const {transaction} = props;

    useEffect(() => {
        props.getTransaction(props.match.params.id);
    }, []);

    return (
        <div>
            <Container>
                <h1>Detail info transaction</h1>
                <Row>
                    <Card style={{width: '100%'}}>
                        <Card.Title className="card-title">
                            Hash: {transaction.hash}
                        </Card.Title>
                        <Row style={{margin: 0}}>
                            <Col xs={6}>
                                <ListGroup variant="flush">
                                    <div>Input</div>
                                    {transaction.inputs && transaction.inputs.map(input => (
                                        <span style={{fontSize: '12px', padding: '3px 0'}} key={input.script}>
                                            {input.prev_out.addr}
                                        </span>
                                    ))}
                                </ListGroup>
                            </Col>
                            <Col xs={6}>
                                <ListGroup variant="flush">
                                    <div>Output</div>
                                    {transaction.out && transaction.out.map(out => (
                                        <span style={{fontSize: '12px', padding: '3px 0'}} key={out.script}>
                                            <div className="d-flex justify-content-between">
                                                <div>{out.addr}</div>
                                                <div>{(out.value * 0.000000001).toFixed(9)} BTC</div>
                                            </div>
                                        </span>
                                    ))}
                                </ListGroup>
                            </Col>
                        </Row>
                    </Card>
                </Row>
                <Row>
                    <Col xs={6} className="summary-data">
                        <Table>
                            <thead>
                            <tr>
                                <th>Summary data</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Size</td>
                                <td>{transaction.size} bytes</td>
                            </tr>
                            <tr>
                                <td>Weight</td>
                                <td>{transaction.weight}</td>
                            </tr>
                            <tr>
                                <td>Created date</td>
                                <td>
                                    {moment(new Date(+`${transaction.time + '000'}`)).format('DD/MM/YYYY HH:mm:ss')}
                                </td>
                            </tr>
                            <tr>
                                <td>Include in block</td>
                                <td>{transaction.block_height}</td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    )
};


export default connect(
    state => ({
        transaction: state.singleTransaction.transaction
    }),
    dispatch => ({
        getTransaction: (hash) => {
            dispatch(singleTransaction.transactionRequest(hash))
        }
    })
)(Transaction);
