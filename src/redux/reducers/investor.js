import {
    SAVE_LIST_INVESTORS,
    GET_INVESTOR_REQUEST,
    SAVE_SEECTED_INVESTOR,
    SAVE_ADD_INVESTOR,
    SAVE_EDIT_INVESTOR,
    SAVE_DELETE_INVESTOR,
} from '../actions/types'

var initialState = {
    users: [],
    seectedId: '',
    user: ''
}

export const Investor = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_LIST_INVESTORS:
            return { ...state, users: action.payload,user:action.payload[0], seectedId: action.payload[0].id }
        case GET_INVESTOR_REQUEST:
            return { ...state, seectedId: action.args[1] }
        case SAVE_SEECTED_INVESTOR:
            return { ...state, user: action.payload }
        case SAVE_ADD_INVESTOR:
            state.users.unshift(action.payload);

            return { ...state, seectedId: action.payload.id, user: action.payload };
        case SAVE_DELETE_INVESTOR:
            let { id, index } = action.payload
            state.users = state.users.filter(b => b.id !== id)

            if (index !== state.users.length) {
                state.seectedId = state.users[index].id
                state.user = state.users[index]
            } else {
                state.seectedId = state.users[index-1].id
                state.user = state.users[index-1]
            }

            return { ...state }
        case SAVE_EDIT_INVESTOR:
            state.users = state.users.map((user) => {
                if (user.id === action.payload.id) {
                    return Object.assign({}, user, action.payload)
                } else return user
            })
            return { ...state, user: action.payload, seectedId: action.payload.id }

        default:
            return state

    }

}
