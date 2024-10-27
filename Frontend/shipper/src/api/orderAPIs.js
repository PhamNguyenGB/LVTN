import axiosClient from "./axiosClient";

export const getOrderInStorage = async () => {
    const request = await axiosClient.get(`/order/storage`);
    return request;
};

export const getOrderInTransit = async () => {
    const request = await axiosClient.get(`/order/transit`);
    return request;
};

export const getOrderInTransited = async () => {
    const request = await axiosClient.get(`/order/transited`);
    return request;
};

export const updateStatus = async (data) => {
    const request = await axiosClient.post(`/order/shipper/update/status`, data);
    return request;
};
