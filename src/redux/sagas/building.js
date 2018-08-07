import { takeLatest, all, takeEvery } from 'redux-saga/effects';
import { message} from 'antd'
import {
    GET_LIST_BUILDING,
    GET_DETAIL_BUILDING,
    ADD_BUILDING,
    EDIT_BUILDING,
    DELETE_BUILDING,
    GET_LIST_FLOOR,
    ADD_CONDO,
    GET_LIST_CONDOS_BY_FLOOR,
    GET_LIST_CONDOS_BY_BUILDING,
    DELETE_CONDO,
    GET_DETAIL_CONDO,
    EDIT_CONDO,
    EDIT_FLOOR,
} from '../actions/types'

import {
    saveListBuilding,
    saveDetailBuilding,
    saveAddbuilding,
    saveEditBuilding,
    saveFloors,
    saveCondosByBuilding,
    saveAddCondo,
    saveFloor
} from '../actions/building'

import building from '../api/building'

import { createRequestSaga } from './common'

const getListBuilding = createRequestSaga({
    request: building.getListBuilding,
    key: 'getListBuilding',
    success: [res => saveListBuilding(res.data)],
    failure: [],
})

const getDetailBuilding = createRequestSaga({
    request: building.getDetailBuilding,
    key: 'getDetailBuilding',
    success: [res => saveDetailBuilding(res.data)],
    failure: [],
})

const addBuilding = createRequestSaga({
    request: building.addBuilding,
    key: 'addBuilding',
    success: [res => saveAddbuilding(res.data)],
    failure: [],
    functionSuccess: [() => message.success('Thêm thành công')],
    functionFailure: [() => message.error('Thêm thất bại')]
})

const editBuilding = createRequestSaga({
    request: building.editBuilding,
    key: 'editBuilding',
    success: [res => saveEditBuilding(res.data)],
    failure: [],
    functionSuccess: [() => message.success('Sửa thành công')],
    functionFailure: [() => message.error('Sửa thất bại')]
})

const deleteBuilding = createRequestSaga({
    request: building.deleteBuilding,
    key: 'deleteBuilding',
    success: [],
    failure: [],
})


//FLOOR
const getListFloor = createRequestSaga({
    request: building.getListFloor,
    key:'getListFloor',
    success:[res => saveFloors(res.data)]
})

const editFloor = createRequestSaga({
    request: building.editFloor,
    key:'editFloor',
    success:[res => saveFloor(res.data)]
})

//CONDO
const addCondo = createRequestSaga({
    request: building.addCondo,
    key: 'addCondo',
    success: [(res) => saveAddCondo(res.data)],
    failure: [],
    functionSuccess: [() => message.success('Thêm thành công')],
    functionFailure: [() => message.error('Thêm thất bại')]
})

const getListCondosByFloor = createRequestSaga({
    request: building.getListCondosByFloor,
    key: 'getListCondosByFloor',
    success: [],
    failure: [],
})


const getListCondosByBuilding = createRequestSaga({
    request: building.getListCondosByBuilding,
    key: 'getListCondosByBuilding',
    success: [res => saveCondosByBuilding(res.data)],
    failure: [],
})

const deleteCondo = createRequestSaga({
    request: building.deleteCondo,
    key: 'deleteCondo',
    success: [],
    failure: [],
})

const getDetailCondo = createRequestSaga({
    request: building.getDetailCondo,
    key: 'getDetailCondo',
    success: [res => saveAddCondo(res.data)],
    failure: [],
})

const editCondo = createRequestSaga({
    request: building.editCondo,
    key: 'editCondo',
    success: [res => saveAddCondo(res.data)],
    failure: [],
    functionSuccess: [() => message.success('Sửa thành công')],
    functionFailure: [() => message.error('Sửa thất bại')]
})




export default [
    function* fetchWatcher() {
        yield all([
            takeLatest(GET_LIST_BUILDING, getListBuilding),
            takeLatest(GET_DETAIL_BUILDING, getDetailBuilding),
            takeLatest(ADD_BUILDING, addBuilding),
            takeLatest(EDIT_BUILDING, editBuilding),
            takeLatest(DELETE_BUILDING, deleteBuilding),

            //FLOOR
            takeLatest(GET_LIST_FLOOR, getListFloor),
            takeLatest(EDIT_FLOOR, editFloor),
            
            //CONDO
            takeLatest(ADD_CONDO, addCondo),
            takeLatest(GET_LIST_CONDOS_BY_FLOOR, getListCondosByFloor),
            takeLatest(GET_LIST_CONDOS_BY_BUILDING, getListCondosByBuilding),
            takeLatest(DELETE_CONDO, deleteCondo),
            takeLatest(EDIT_CONDO, editCondo),
            takeEvery(GET_DETAIL_CONDO, getDetailCondo),
        ]);
    }
];
