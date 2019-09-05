import {
    put,
    call,
    all,
    takeEvery,
} from 'redux-saga/effects';

import api from '../api';

const FETCH_BLOCKS_REQUEST = 'block/FETCH_BLOCKS_REQUEST';
const FETCH_BLOCKS_SUCCESS = 'block/FETCH_BLOCKS_SUCCESS';
const FETCH_BLOCKS_FAILURE = 'block/FETCH_BLOCKS_FAILURE';
const SET_LOADING = 'block/SET_LOADING';


export const blocksRequested = (day) => {
    return {
        type: FETCH_BLOCKS_REQUEST,
        payload: day
    };
};

export const blocksLoaded = (blocks) => {
    return {
        type: FETCH_BLOCKS_SUCCESS,
        payload: blocks
    };
};

export const blocksFailure = (error) => {
    return {
        type: FETCH_BLOCKS_FAILURE,
        payload: error
    };
};

export const setLoading = () => {
    return {
        type: SET_LOADING
    };
};

const initialState = {
    blocks: [],
    loading: false,
    error: null
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {

        case FETCH_BLOCKS_REQUEST:
            return {
                ...state,
            };
        case FETCH_BLOCKS_SUCCESS:
            return {
                ...state,
                blocks: action.payload !== undefined ? action.payload : [],
                loading: false
            };
        case FETCH_BLOCKS_FAILURE:
            return {
                ...state,
                blocks: [],
                loading: false,
                error: action.payload
            };
        case SET_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
};

export function* getBlocksSaga() {
    yield put(setLoading());
    const response = yield call(api.fetchBlocks);
    if (response.status === 200) {
        yield put(blocksLoaded(response.data.blocks));
    } else {
        yield put(blocksFailure(response.error));
    }
};


export function* watchBlocksActions() {
    yield all([
        takeEvery(FETCH_BLOCKS_REQUEST, getBlocksSaga)
    ])
};
