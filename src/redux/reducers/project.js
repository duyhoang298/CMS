import {
    SAVE_LIST_PROJECTS,
    SAVE_DETAIL_PROJECT,
    GET_DETAIL_PROJECT,
    SAVE_UPDATE_PROJECT,
    SAVE_DELETE_PROJECT,
    SAVE_ADD_PROJECT
} from '../actions/types'

var initialState = {
    projects: [],
    seectedId: '',
    project: ''
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DETAIL_PROJECT:
            return { ...state, seectedId: action.args[1] }
        case SAVE_LIST_PROJECTS:
            return { ...state, projects: action.payload, project: action.payload[0], seectedId: action.payload[0].id }
        case SAVE_DETAIL_PROJECT:
            return { ...state, project: action.payload, seectedId: action.payload.id }
        case SAVE_ADD_PROJECT:
            state.projects.unshift(action.payload)
            return { ...state, seectedId: action.payload.id, project: action.payload }
        case SAVE_DELETE_PROJECT:
            let { id, index } = action.payload
            state.projects = state.projects.filter(project => project.id !== id)

            if (index !== state.projects.length) {
                state.seectedId = state.projects[index].id
                state.project = state.projects[index]
            } else {
                state.seectedId = state.projects[index - 1].id
                state.project = state.projects[index - 1]
            }

            return { ...state }
        case SAVE_UPDATE_PROJECT:
            state.projects = state.projects.map(project => {
                if (project.id === action.payload.id) {
                    return Object.assign({}, project, action.payload)
                } else return project
            })
            return { ...state, project: action.payload }
        default: return state

    }
}






