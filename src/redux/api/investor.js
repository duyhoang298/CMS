import { API } from './common'
 

export default {
    fetchInvestors: (token) => API.get('/developers',{}, { headers: { Authorization: `Bearer ${token}` } }),
    getInvestor: (token,id) => API.get(`/developers/${id}`,{}, { headers: { Authorization: `Bearer ${token}` } }),
    addInvestor: (token, data) => API.post(`/developers`, data,{headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'multipart/form-data',}}),
    deleteInvestor: (token, id) => API.delete(`developers/${id}`,{},  {headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'multipart/form-data'}}),
    updateInvestor: (token, data, id) => API.patch(`/developers/${id}`, data, {headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'multipart/form-data'}})
}