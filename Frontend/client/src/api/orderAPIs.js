import axiosClient from "./axiosClient";

export const addOrder = async (data) => {
    const request = await axiosClient.post(`/order/addOrder`, data);
    return request;
};


// ORDER DETAIL
export const addOrderDetail = async (data) => {
    const request = await axiosClient.post(`/Details/addOrderDetail`, data);
    return request;
};
