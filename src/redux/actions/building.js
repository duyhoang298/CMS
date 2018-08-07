import {
    GET_LIST_BUILDING,
    GET_DETAIL_BUILDING,
    SAVE_LIST_BUILDING,
    SAVE_DETAIL_BUILDING,
    ADD_BUILDING,
    DELETE_BUILDING,
    SAVE_ADD_BUILDING,
    EDIT_BUILDING,
    SAVE_EDIT_BUILDING,
    SAVE_DELETE_BUILDING,
    GET_LIST_FLOOR,
    SAVE_FLOORS,
    ADD_CONDO,
    GET_LIST_CONDOS_BY_FLOOR,
    GET_LIST_CONDOS_BY_BUILDING,
    SAVE_CONDOS_BY_BUILDING,
    DELETE_CONDO,
    SAVE_DELETE_CONDO,
    GET_DETAIL_CONDO,
    SAVE_ADD_CONDO,
    EDIT_CONDO,
    EDIT_FLOOR,
    SAVE_FLOOR
} from './types'
//BUILDING
export const getListBuilding = (...args) => ({ type: GET_LIST_BUILDING, args })
export const getDetailBuilding = (...args) => ({ type: GET_DETAIL_BUILDING, args })
export const addBuilding = (...args) => ({type: ADD_BUILDING, args})
export const deleteBuilding = (...args) => ({type: DELETE_BUILDING, args})
export const editBuilding = (...args) => ({type: EDIT_BUILDING, args})

export const saveListBuilding = payload => ({ type: SAVE_LIST_BUILDING, payload })
export const saveDetailBuilding = payload => ({ type: SAVE_DETAIL_BUILDING, payload })
export const saveAddbuilding = payload => ({ type: SAVE_ADD_BUILDING, payload })
export const saveEditBuilding = payload => ({ type: SAVE_EDIT_BUILDING, payload })
export const saveDeleteBuilding = payload => ({ type: SAVE_DELETE_BUILDING, payload })

//FLOOR
export const getListFloor = (...args) => ({type: GET_LIST_FLOOR, args})
export const editFloor = (...args) => ({type: EDIT_FLOOR, args})

export const saveFloors = payload => ({type: SAVE_FLOORS, payload})
export const saveFloor = payload => ({type: SAVE_FLOOR, payload})

// CONDO
export const addCondo = (...args) => ({type: ADD_CONDO, args})
export const deleteCondo = (...args) => ({type: DELETE_CONDO, args})
export const editCondo = (...args) => ({type: EDIT_CONDO, args})
export const getListCondosByFloor = (...args) => ({type: GET_LIST_CONDOS_BY_FLOOR, args})
export const getListCondosByBuilding = (...args) => ({type: GET_LIST_CONDOS_BY_BUILDING, args})
export const getDetailCondo = (...args) => ({type: GET_DETAIL_CONDO, args})

export const saveCondosByBuilding = payload => ({type: SAVE_CONDOS_BY_BUILDING, payload})
export const saveDeleteCondo = payload => ({type: SAVE_DELETE_CONDO, payload})
export const saveAddCondo = payload => ({type: SAVE_ADD_CONDO, payload})










// export const fetchBuilding = () => ({ type: 'FETCH_BUILDING' });
// export const actGetIdBuildingRequest = id => ({ type: 'GET_BUILDING_REQUEST', id })
// export const actAddBuilding = building => ({ type: 'ADD_BUILDING_REQUEST', building })
// export const actDeleteBuilding = id => ({ type: 'DELETE_BUILDING_REQUEST', id })
// export const actEditBuilding = building => ({ type: 'EDIT_BUILDING_REQUEST', building })



export const actAddFloor = data => ({ type: 'ADD_FLOOR_REQUEST', data })
export const actEditFloor = data => ({ type: 'EDIT_FLOOR_REQUEST', data })
export const actDeleteFloor = id => ({ type: 'DELETE_FLOOR_REQUEST', id })

export const actAddCondo = data => ({ type: 'ADD_CONDO_REQUEST', data })
export const actEditCondo = data => ({ type: 'EDIT_CONDO_REQUEST', data })
export const actDeleteCondo = id => ({ type: 'DELETE_CONDO_REQUEST', id })

