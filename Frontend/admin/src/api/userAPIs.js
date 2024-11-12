import axiosClient from "./axiosClient";

export const getAllUsers = async () => {
    const request = await axiosClient.get(`/user/getAllUsers`);
    return request;
};

export const updateLevel = async (data) => {
    const request = await axiosClient.post('/user/update/level', data);
    return request;
}
