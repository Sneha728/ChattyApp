import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://chattyapp-backend.onrender.com/",
    withCredentials:true,
});


