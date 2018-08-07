import {
     GET_LIST_USERS,
     SAVE_LIST_USERS,
     UPDATE_USER,
     SAVE_EDIT_USER,
     DELETE_USER,
     SAVE_DELETE_USER
} from './types'

export const getListUsers = (...args) => ({type: GET_LIST_USERS, args})
export const updateUser = (...args) => ({type: UPDATE_USER, args})
export const deleteUser = (...args) => ({type: DELETE_USER, args})

export const saveListUsers = payload => ({type: SAVE_LIST_USERS, payload})
export const saveEditUser = payload => ({type: SAVE_EDIT_USER, payload})
export const saveDeleteUser = payload => ({type: SAVE_DELETE_USER, payload})