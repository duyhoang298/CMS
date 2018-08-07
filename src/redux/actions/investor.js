import {
    GET_LIST_INVESTORS,
    ADD_INVESTOR_REQUEST,
    DELETE_INVESTOR_REQUEST,
    EDIT_INVESTOR_REQUEST,
    GET_INVESTOR_REQUEST,
    
    SAVE_LIST_INVESTORS,
    SAVE_SEECTED_INVESTOR,
    SAVE_ADD_INVESTOR,
    SAVE_EDIT_INVESTOR,
    SAVE_DELETE_INVESTOR,
} from './types'

export const actGetListInvestor = (...args) => ({ type: GET_LIST_INVESTORS, args })
export const actGetInvestorRequest = (...args) => ({ type: GET_INVESTOR_REQUEST, args })
export const actAddInvestorRequest = (...args) =>({type: ADD_INVESTOR_REQUEST,args})
export const actDeleteInvestorRequest = (...args) => ({ type: DELETE_INVESTOR_REQUEST, args })
export const actEditInvestorRequest =  (...args) => ({ type: EDIT_INVESTOR_REQUEST, args })

export const saveListInvestors = data => ({ type: SAVE_LIST_INVESTORS, payload: data })
export const saveSeectedInvestor = data => ({ type: SAVE_SEECTED_INVESTOR, payload: data })
export const saveAddInvestor = data => ({ type: SAVE_ADD_INVESTOR, payload: data })
export const saveEditInvestor = data => ({ type: SAVE_EDIT_INVESTOR, payload: data })
export const saveDeleteInvestor = data => ({ type: SAVE_DELETE_INVESTOR, payload: data })