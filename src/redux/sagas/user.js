import { takeLatest, all } from 'redux-saga/effects';
import { message } from 'antd'

import {
    GET_LIST_USERS, UPDATE_USER, DELETE_USER
} from '../actions/types';
import user from '../api/user';
import {
    saveListUsers, saveEditUser
} from '../actions/user';
import { createRequestSaga } from './common';

const getListUsers = createRequestSaga({
    request: user.getListUsers,
    key: 'getListUsers',
    success: [res => saveListUsers(res.data)],
    failure: [],

});

const updateUser = createRequestSaga({
    request: user.updateUser,
    key: 'updateUser',
    success: [res => saveEditUser(res)],
    failure: [],
    functionSuccess: [() => message.success('Cập nhật thành công')],
    functionFailure: [() => message.error(' Cập nhật thất bại')],

})
const deleteUser = createRequestSaga({
    request: user.deleteUser,
    key: 'deleteUser',
    success: [],
    failure: [],
})

// root saga reducer
export default [
    function* fetchWatcher() {
        yield all([
            takeLatest(GET_LIST_USERS, getListUsers),
            takeLatest(UPDATE_USER, updateUser),
            takeLatest(DELETE_USER, deleteUser),

        ]);
    }
];

