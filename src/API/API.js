import axios from 'axios';

const API = axios.create({
    baseURL: "http://localhost:5000"
})

export default API;

// https://inventory-backend-2f7v.onrender.com