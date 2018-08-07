import {takeLatest, all} from 'redux-saga/effects'
import {message} from 'antd'
import {
    GET_LIST_INVESTORS,
    GET_INVESTOR_REQUEST,
    ADD_INVESTOR_REQUEST,
    DELETE_INVESTOR_REQUEST,
    EDIT_INVESTOR_REQUEST,
} from '../actions/types'
import { createRequestSaga } from './common';
import investor from '../api/investor';
import {
  saveListInvestors,
  saveSeectedInvestor,
  saveAddInvestor,
  saveEditInvestor,
} from '../actions/investor';

const fetchInvestors = createRequestSaga({
    request: investor.fetchInvestors,
    key: 'fetchInvestors',
    success: [res => saveListInvestors(res.data) ],
    failure: [],
    // functionSuccess: [res => console.log(res)],
    // functionFailure: [console.log('Failure')]
  });

const getInvestor = createRequestSaga({
  request: investor.getInvestor,
  key: 'getInvestor',
  success:[res => saveSeectedInvestor(res.data)],
  failure:[],
})

const addInvestor = createRequestSaga({
  request: investor.addInvestor,
  key:'addInvestor',
  success: [ (res) => saveAddInvestor(res.data)],
  failure:[],
  functionSuccess: [() => message.success('Thêm thành công')],
  functionFailure: [() => message.error('Thêm thất bại')],
})

const deleteInvestor = createRequestSaga({
  request: investor.deleteInvestor,
  key:'deleteInvestor',
  // success: [ (res) => saveDeleteInvestor(res.data.id)],
  // failure:[],
  // functionSuccess: [() => message.success('Xóa thành công')],
  // functionFailure: [() => message.error('Xóa thất bại')],
})

const updateInvestor =  createRequestSaga({
  request: investor.updateInvestor,
  key:'updateInvestor',
  success: [ (res) => saveEditInvestor(res.data)],
  failure:[],
  functionSuccess: [() => message.success('Update thành công')],
  functionFailure: [() => message.error('Update thất bại')],
})

 


  export default [
    function* fetchWatcher() {
      //  yield takeLatest(GET_LIST_INVESTORS, fetchInvestors)
       
      yield all([
        takeLatest(GET_LIST_INVESTORS, fetchInvestors),
        takeLatest(GET_INVESTOR_REQUEST, getInvestor),
        takeLatest(ADD_INVESTOR_REQUEST, addInvestor),
        takeLatest(DELETE_INVESTOR_REQUEST, deleteInvestor),
        takeLatest(EDIT_INVESTOR_REQUEST, updateInvestor),
      ]);
    }
  ];
  