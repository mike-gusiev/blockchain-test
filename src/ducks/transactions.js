import {
    put,
    call,
    all,
    takeEvery,
} from 'redux-saga/effects';

import api from '../api';

const FETCH_TRANSACTIONS_REQUEST = 'transaction/FETCH_TRANSACTIONS_REQUEST';
const FETCH_TRANSACTIONS_SUCCESS = 'transaction/FETCH_TRANSACTIONS_SUCCESS';
const FETCH_TRANSACTIONS_FAILURE = 'transaction/FETCH_TRANSACTIONS_FAILURE';
const FETCH_TRANSACTIONS_LOADING = 'transaction/FETCH_TRANSACTIONS_LOADING';

export const transactionsRequested = () => {
    return {
        type: FETCH_TRANSACTIONS_REQUEST
    };
};

export const transactionsLoaded = (transactions) => {
    return {
        type: FETCH_TRANSACTIONS_SUCCESS,
        payload: transactions
    };
};

export const transactionsFailure = (error) => {
    return {
        type: FETCH_TRANSACTIONS_FAILURE,
        payload: error
    };
};

export const transactionsLoading = () => {
    return {
        type: FETCH_TRANSACTIONS_LOADING
    };
};

const initialState = {
    transactions: [],

    loading: false,
    error: false
};


export default function reducer(state = initialState, action = {}) {
    switch (action.type) {

        case FETCH_TRANSACTIONS_SUCCESS:
            return {
                ...state,
                transactions: action.payload !== undefined ? action.payload : [],
                loading: false,
                error: null
            };

        case FETCH_TRANSACTIONS_FAILURE:
            return {
                ...state,
                transactions: [],
                loading: false,
                error: action.payload
            };

        case FETCH_TRANSACTIONS_LOADING:
            return {
                ...state,
                loading: true,
                error: null
            };

        default:
            return state
    }
}

export function* getTransactions() {
    yield put(transactionsLoading());

    const response = yield call(api.fetchTransactions);
    if (response.status === 200) {
        yield put(transactionsLoaded(response.data.txs));
    } else {
        yield put(transactionsFailure(response.error));
    }
}

export function* watchGetTransactions() {
    yield all([
        takeEvery(FETCH_TRANSACTIONS_REQUEST, getTransactions)
    ])
}
