import { API } from './common';

export default {
    getListCities: (token) => API.get('/cities', {}, { headers: { Authorization: `Bearer ${token}` } }),
    getListDistric: (token, city_id) => API.get(`/districts?city_id=${city_id}`, {}, { headers: { Authorization: `Bearer ${token}` } }),
    getListWards: (token, district_id) => API.get(`/wards?district_id=${district_id}`, {}, { headers: { Authorization: `Bearer ${token}` } }),
};
