import {
    GET_LIST_PROJECTS,
    GET_DETAIL_PROJECT,
    SAVE_LIST_PROJECTS,
    SAVE_DETAIL_PROJECT,
    ADD_PROJECT,
    UPDATE_PROJECT,
    SAVE_UPDATE_PROJECT,
    SEARCH_PROJECT,
    DELETE_PROJECT,
    SAVE_DELETE_PROJECT,
    SAVE_ADD_PROJECT
} from './types'

export const getListProjects = (...args) => ({type: GET_LIST_PROJECTS, args})
export const getDetailProject = (...args) => ({type: GET_DETAIL_PROJECT, args})
export const addProject = (...args) => ({ type: ADD_PROJECT, args });
export const updateProject = (...args) => ({ type: UPDATE_PROJECT, args });
export const searchProject = (...args) => ({type: SEARCH_PROJECT, args})
export const deleteProject = (...args) => ({type: DELETE_PROJECT, args})

export const saveListProjects = (payload) => ({type: SAVE_LIST_PROJECTS,payload})
export const saveDetailProject = (payload) => ({type: SAVE_DETAIL_PROJECT,payload})
export const saveUpdateProject = (payload) => ({type: SAVE_UPDATE_PROJECT,payload})
export const saveDeleteProject = (payload) => ({type: SAVE_DELETE_PROJECT,payload})
export const saveAddProject = (payload) => ({type: SAVE_ADD_PROJECT,payload})
