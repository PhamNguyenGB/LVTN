import axiosClient from "./axiosClient";

export const fetAllPoint = async () => {
    const request = await axiosClient.get('/point');
    return request;
};

export const createPoint = async (dataPoint) => {
    const request = await axiosClient.post('/point/create', dataPoint);
    return request;
};

export const updatePoint = async (dataPoint) => {
    const request = await axiosClient.put('/point/update', dataPoint);
    return request;
};

export const deletePoint = async (pointId) => {
    const request = await axiosClient.delete(`/point/delete/${pointId}`);
    return request;
};

export const updatePointUser = async (dataUser) => {
    const request = await axiosClient.post('/user/update/point', dataUser);
    return request;
}
