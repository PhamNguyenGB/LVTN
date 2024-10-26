import axiosClient from "./axiosClient";

export const getOrderDetail = async (orderId) => {
    const request = await axiosClient.get(`/Details/staff/orderDetail/${orderId}`);
    return request;
};
