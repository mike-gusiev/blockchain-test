import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Table, Container} from 'react-bootstrap';

import * as blockDuck from '../../ducks/blocks';

export class Blocks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDay: new Date().getTime()
        };
    };

    componentDidMount() {
        this.props.getBlocks(this.state.currentDay);
    };

    render() {

        const {loading, blocks} = this.props;

        return (
            <Container>
                <h1>Blocks Page</h1>
                {loading ?
                    <h1>LOADING ...</h1>
                    :
                    <Table responsive bordered striped>
                        <thead>
                        <tr>
                            <th>Hash</th>
                            <th>Height</th>
                            <th>Time</th>
                            <th>Main chain</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            blocks.map((block) => {
                                return (
                                    <tr key={block.height}>
                                        <td>{block.hash}</td>
                                        <td>{block.height}</td>
                                        <td>{block.time}</td>
                                        <td>{block.main_chain ? "True" : "False"}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </Table>
                }
            </Container>
        );
    }
}

export default connect(
    state => ({
        blocks: state.blocks.blocks,
        loading: state.blocks.loading
    }),
    dispatch => ({
        getBlocks: (day) => dispatch(blockDuck.blocksRequested(day))
    })
)(Blocks);
