import {
    SAVE_LIST_USERS, SAVE_EDIT_USER, SAVE_DELETE_USER
} from '../actions/types'

const initialState = {
    users: [],
    user: {}
}

export const User = (state = initialState, {type, payload}) => {
    switch (type) {
        case SAVE_LIST_USERS:
            return {...state, users: payload}
        case SAVE_EDIT_USER:
            state.users = state.users.map(user => {
                if(user.id === payload.id) return Object.assign({}, user, payload)
                else return user
            })
            return {...state}
        case SAVE_DELETE_USER:
            state.users = state.users.filter(user => user.id !== payload);
            return {...state}
        default:
            return state
    }
}