import { API } from './common';

export default {
    getListBuilding: (token) => API.get('/buildings', {}, { headers: { Authorization: `Bearer ${token}` } }),
    getDetailBuilding: (token, id) => API.get(`/buildings/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } }),
    addBuilding: (token, building) => API.post(`/buildings`, { building }, { headers: { Authorization: `Bearer ${token}` } }),
    editBuilding: (token, building, id) => API.put(`/buildings/${id}`, { building }, { headers: { Authorization: `Bearer ${token}` } }),
    deleteBuilding: (token, id) => API.delete(`/buildings/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } }),

    //FLOOR
    getListFloor: (token, building_id) => API.get(`/floors?building_id=${building_id}`, {}, { headers: { Authorization: `Bearer ${token}` } }),
    editFloor: (token, floor, id) => API.put(`/floors/${id}`, { floor:{name: floor} }, { headers: { Authorization: `Bearer ${token}` } }),
    //CONDO
    addCondo: (token, data) => API.post('/condos', data, { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }),
    editCondo: (token, condo, id) => API.put(`/condos/${id}`, condo, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data'  } }),
    getListCondosByFloor: (token, floor_id) => API.get(`/condos?floor_id=${floor_id}`, {}, { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }),
    getListCondosByBuilding: (token, building_id) => API.get(`/condos?building_id=${building_id}`, {}, { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }),
    deleteCondo: (token, id) => API.delete(`/condos/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } }),
    getDetailCondo: (token, id) => API.get(`/condos/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } }),


}

