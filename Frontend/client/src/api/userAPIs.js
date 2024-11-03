import axiosClient from "./axiosClient";
import axios from "axios";

export const loginGoogle = async (token) => {
    const request = await axios.post('http://localhost:8080/api/social/auth/google', { token });
    return request;
};

export const sendOTP = async (data) => {
    const request = await axiosClient.post('/user/sendOTP', data);
    return request;
};

export const register = async (data) => {
    const request = await axiosClient.post('/user/register', data);
    return request;
};
