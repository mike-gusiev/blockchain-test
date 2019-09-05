import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Container, Row, Table, Spinner} from 'react-bootstrap';

import * as blocksDuck from '../../ducks/blocks';
import * as transactionsDuck from '../../ducks/transactions';

const Main = (props) => {

    useEffect(() => {
        props.getTransactions();
        props.getBlocks();
    }, []);

    const {blocks, transactions, loadingTransactions, loadingBlocks} = props;
    return (
        <div>
            <Container>
                <Row>
                    <h1>Last blocks</h1>
                    <Link style={{ margin: '15px 0 0 15px' }} to="/blocks">See all blocks</Link>
                    {loadingBlocks ? (
                        <Spinner animation="border" variant="primary"/>
                    ) : (
                        <Table responsive bordered>
                            <thead>
                            <tr>
                                <th>Hash</th>
                                <th>Height</th>
                                <th>Time</th>
                                <th>Main chain</th>
                            </tr>
                            </thead>
                            <tbody>
                            {blocks.map(block => (
                                <tr key={block.height}>
                                    <td>{block.hash}</td>
                                    <td>{block.height}</td>
                                    <td>{block.time}</td>
                                    <td>{block.main_chain ? "True" : "False"}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    )}
                </Row>

                <Row>
                    <h1>Last transactions</h1>
                    {loadingTransactions ? (
                        <Spinner animation="border" variant="primary"/>
                    ) : (
                        <Table responsive bordered>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Time</th>
                                <th>Weight</th>
                            </tr>
                            </thead>
                            <tbody>
                            {transactions.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <Link to={'/transaction/' + item.hash}>{item.hash}</Link>
                                    </td>
                                    <td>{item.time}</td>
                                    <td>{item.weight}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    )}
                </Row>
            </Container>
        </div>
    )
};

export default connect(
    state => ({
        transactions: state.transactions.transactions,
        blocks: state.blocks.blocks.slice(1, 10),
        loadingTransactions: state.transactions.loading,
        loadingBlocks: state.blocks.loading
    }),
    dispatch => ({
        getTransactions: () => {
            dispatch(transactionsDuck.transactionsRequested())
        },
        getBlocks: () => {
            dispatch(blocksDuck.blocksRequested())
        }
    })
)(Main);
