import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers} from "redux";
import createSagaMiddleware from 'redux-saga';
import * as blocksReducers from './ducks/blocks';
import * as transactionsReducers from './ducks/transactions';
import * as singleTransactionReducers from './ducks/singleTransaction'

import './index.css';
import App from './App';

const rootReducer = combineReducers({
    blocks: blocksReducers.default,
    transactions: transactionsReducers.default,
    singleTransaction: singleTransactionReducers.default
});
const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(blocksReducers.watchBlocksActions);
sagaMiddleware.run(transactionsReducers.watchGetTransactions);
sagaMiddleware.run(singleTransactionReducers.watchGetTransaction);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
