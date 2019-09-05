import {
    put,
    call,
    all,
    takeEvery,
} from 'redux-saga/effects';

import api from '../api';

const FETCH_TRANSACTION_REQUEST = 'transaction/FETCH_TRANSACTION_REQUEST';
const FETCH_TRANSACTION_SUCCESS = 'transaction/FETCH_TRANSACTION_SUCCESS';
const FETCH_TRANSACTION_FAILURE = 'transaction/FETCH_TRANSACTION_FAILURE';
const FETCH_TRANSACTION_LOADING = 'transaction/FETCH_TRANSACTION_LOADING';

export const transactionRequest = (hash) => {
    return {
        type: FETCH_TRANSACTION_REQUEST,
        payload: hash
    };
};

export const transactionLoaded = (transaction) => {
    return {
        type: FETCH_TRANSACTION_SUCCESS,
        payload: transaction
    };
};

export const transactionFailure = (error) => {
    return {
        type: FETCH_TRANSACTION_FAILURE,
        payload: error
    };
};

export const transactionLoading = () => {
    return {
        type: FETCH_TRANSACTION_LOADING
    };
};

const initialState = {
    transaction: [],

    loading: false,
    error: false
};


export default function reducer(state = initialState, action = {}) {
    switch (action.type) {

        case FETCH_TRANSACTION_SUCCESS:
            return {
                ...state,
                transaction: action.payload !== undefined ? action.payload : [],
                loading: false,
                error: null
            };

        case FETCH_TRANSACTION_FAILURE:
            return {
                ...state,
                transaction: [],
                loading: false,
                error: action.payload
            };

        case FETCH_TRANSACTION_LOADING:
            return {
                ...state,
                loading: true,
                error: null
            };

        default:
            return state
    }
}

export function* getTransaction(action) {
    yield put(transactionLoading());
    const response = yield call(api.fetchTransaction, action.payload);
    if (response.status === 200) {
        yield put(transactionLoaded(response.data));
    } else {
        yield put(transactionFailure(response.error));
    }
}

export function* watchGetTransaction() {
    yield all([
        takeEvery(FETCH_TRANSACTION_REQUEST, getTransaction)
    ])
}
