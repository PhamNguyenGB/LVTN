import axiosClient from "./axiosClient";

export const sendOTP = async (data) => {
    const request = await axiosClient.post('/staff/sendOTP', data);
    return request;
};

export const registerStaff = async (data) => {
    const request = await axiosClient.post('/staff/register', data);
    return request;
};

export const chancePassword = async (data) => {
    const request = await axiosClient.post('/staff/chance/pass', data);
    return request;
};

export const forgotPass = async (data) => {
    const request = await axiosClient.post('/staff/forgot/pass', data);
    return request;
};

export const getAllStaffs = async () => {
    const request = await axiosClient.get('/staff/all/staff');
    return request;
};

export const deleteRole = async (staffId) => {
    const request = await axiosClient.post('/staff/delete/role', staffId);
    return request;
};

export const resetRole = async (staffId) => {
    const request = await axiosClient.post('/staff/reset/role', staffId);
    return request;
};