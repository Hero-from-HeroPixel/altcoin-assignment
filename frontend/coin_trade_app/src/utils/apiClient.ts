import axios from "axios";

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URI,
    timeout: 5000 //5 seconds
})