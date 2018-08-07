import { API } from './common';

export default {
    getListUsers: (token) => API.get('/users', {}, { headers: { Authorization: `Bearer ${token}` } }),
    updateUser: (token,id, user) => API.patch(`users/${id}`, user, {headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'multipart/form-data',}}),
    deleteUser: (token, id) => API.delete(`/users/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } }),
    
};
