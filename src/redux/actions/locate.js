import {
    GET_LIST_CITIES,
    GET_LIST_DISTRIC,
    GET_LIST_WARDS
} from './types'

export const getListCities = (...args) => ({type: GET_LIST_CITIES, args})
export const getListDistric = (...args) => ({type: GET_LIST_DISTRIC, args})
export const getListWards = (...args) => ({type: GET_LIST_WARDS, args})