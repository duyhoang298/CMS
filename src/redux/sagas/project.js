import { takeLatest, all } from 'redux-saga/effects';
import {message} from 'antd'

import {
    GET_LIST_PROJECTS,
    GET_DETAIL_PROJECT,
    ADD_PROJECT,
    UPDATE_PROJECT,
    SEARCH_PROJECT,
    DELETE_PROJECT
} from '../actions/types';
import project from '../api/project';
import {
    saveListProjects,
    saveDetailProject,
    saveUpdateProject,
    saveAddProject
} from '../actions/project';
import { createRequestSaga } from './common';

const getListProjects = createRequestSaga({
    request: project.getListProjects,
    key: 'getListProjects',
    success: [res => saveListProjects(res.data)],
    failure: [],

});

const getDetailProject = createRequestSaga({
    request: project.getDetaiProject,
    key: 'getDetailProject',
    success: [res => saveDetailProject(res.data)],
    failure: [],
    functionSuccess: []
});


const addProject = createRequestSaga({
    request: project.addProject,
    key: 'addProject',
    success:[res => saveAddProject(res.data)],
    functionSuccess: [() => message.success('Thêm dự án thành công')],
    functionFailure: [()=> message.error('Thêm dự án thất bại')]
});

const updateProject = createRequestSaga({
    request: project.updateProject,
    key: 'updateProject',
    success:[res => saveUpdateProject(res.data)],
    functionSuccess: [() => message.success('Cập nhật dự án thành công')],
    functionFailure: [()=> message.error('Cập nhật dự án thất bại')]
});

const deleteProject = createRequestSaga({
    request: project.deleteProject,
    key: 'deleteProject'
});

const searchProject = createRequestSaga({
    request: project.searchProject,
    key: 'searchProject',
})




// root saga reducer
export default [
    function* fetchWatcher() {
        yield all([
            takeLatest(GET_LIST_PROJECTS, getListProjects),
            takeLatest(GET_DETAIL_PROJECT, getDetailProject),
            takeLatest(ADD_PROJECT, addProject),
            takeLatest(UPDATE_PROJECT, updateProject),
            takeLatest(DELETE_PROJECT, deleteProject),
            takeLatest(SEARCH_PROJECT, searchProject),

             
        ]);
    }
];

