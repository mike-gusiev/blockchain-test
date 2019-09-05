import React, {useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';

import './Header.css';
import {ReactComponent as Logo} from '../../Logo.svg';
import {ReactComponent as Shape} from '../../shape.svg';
import * as singleTransaction from '../../ducks/singleTransaction';

const Header = (props) => {

    const [inputValue, setInputValue] = useState('3ab30534c82e4a0ad071767610315cde64fb6923775ab5a96f0cb9a56368ca5e');

    const handleSubmit = (e) => {
        e.preventDefault();


        if (/[0-9a-f]{64}/i.test(inputValue)) {
            props.history.push(`/transaction/${inputValue}`)
        } else {
            alert('Wrong hash!');
        }
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div>
            <Container className="header">
                <Row className="d-flex align-items-center">
                    <Link to="/">
                        <Logo/>
                    </Link>

                    <Col md={{span: 1, offset: 3}}>
                        <Shape/>
                    </Col>
                    <form onSubmit={handleSubmit}>
                        <input type="text"
                               placeholder="Block, Transaction, Hash, etc."
                               value={inputValue}
                               onChange={handleChange}
                        />
                    </form>
                </Row>
            </Container>
        </div>
    )
};

export default connect(
    dispatch => ({
        getTransaction: () => {
            dispatch(singleTransaction.transactionRequest)
        }
    })
)(withRouter(Header));
