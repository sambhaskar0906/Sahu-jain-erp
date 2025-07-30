import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;