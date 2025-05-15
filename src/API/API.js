import axios from 'axios';

const API = axios.create({
    baseURL: "https://inventory-backend-2f7v.onrender.com",
    withCredentials: true,

})

export default API;

// https://inventory-backend-2f7v.onrender.com