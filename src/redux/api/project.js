import { API } from './common';

export default {
    getListProjects: (token) => API.get('/projects', {}, { headers: { Authorization: `Bearer ${token}` } }),
    getDetaiProject: (token, id) => API.get(`/projects/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } }),
    addProject: (token, data) =>API.post('/projects',data,{headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'multipart/form-data',}}),
    updateProject: (token, data,id) =>API.put(`/projects/${id}`,data,{headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'multipart/form-data',}}),
    searchProject:(token,kw) => API.get(`project-search?keyword="${kw}"`,{headers: {'Authorization': `Bearer ${token}`}}),
    deleteProject: (token, id) => API.delete(`/projects/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } }),

};
