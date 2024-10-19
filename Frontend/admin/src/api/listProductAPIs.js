import axiosClient from "./axiosClient";

export const fetAllListProduct = async () => {
    const request = await axiosClient.get('/listProduct');
    return request;
};

export const createListProduct = async (dataLP) => {
    const request = await axiosClient.post('/listProduct/create', dataLP);
    return request;
};

export const updateListProduct = async (dataLP) => {
    const request = await axiosClient.put('/listProduct/update', dataLP);
    return request;
};

export const deleteListProduct = async (LPId) => {
    const request = await axiosClient.delete(`/listProduct/delete/${LPId}`);
    return request;
};
