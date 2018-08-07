import { takeLatest, all } from 'redux-saga/effects';
import {
    GET_LIST_CITIES,
    GET_LIST_DISTRIC,
    GET_LIST_WARDS
} from '../actions/types';
import locate from '../api/locate';
import {
     
} from '../actions/locate';
import { createRequestSaga } from './common';

const getListCities = createRequestSaga({
    request: locate.getListCities,
    key: 'getListCities',
    success: [],
    failure: [],
});
const getListDistric = createRequestSaga({
    request: locate.getListDistric,
    key: 'getListDistric',
    success: [],
    failure: [],
});
const getListWards = createRequestSaga({
    request: locate.getListWards,
    key: 'getListWards',
    success: [],
    failure: [],
});

 



// root saga reducer
export default [
    function* fetchWatcher() {
        yield all([
            takeLatest(GET_LIST_CITIES, getListCities),
            takeLatest(GET_LIST_DISTRIC, getListDistric),
            takeLatest(GET_LIST_WARDS, getListWards),
        ]);
    }
];

