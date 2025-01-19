import api from '../utils/axiosConfig.js';

const fetchHalls = async (page, limit) => {
    const response = await api.get('/halls', { params: { page, limit } });
    return response.data;
};

const fetchHallById = async (id) => {
    const response = await api.get(`/halls/${id}`);
    return response.data;
};

const createHall = async (hallData) => {
    const response = await api.post('/halls', hallData);
    return response.data;
};

const updateHall = async (id, hallData) => {
    const response = await api.put(`/halls/${id}`, hallData);
    return response.data;
};

const deleteHall = async (id) => {
    const response = await api.delete(`/halls/${id}`);
    return response.data;
};

export default {
    fetchHalls,
    fetchHallById,
    createHall,
    updateHall,
    deleteHall,
};
