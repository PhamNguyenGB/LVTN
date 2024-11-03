import axiosClient from "./axiosClient";

export const addOrder = async (data) => {
    const request = await axiosClient.post(`/order/addOrder`, data);
    return request;
};

export const getOrderById = async () => {
    const request = await axiosClient.get('/order/getOrderById');
    return request;
};


// ORDER DETAIL
export const addOrderDetail = async (data) => {
    const request = await axiosClient.post(`/Details/addOrderDetail`, data);
    return request;
};

export const getOrderDetail = async (orderId) => {
    let request = await axiosClient.get(`/Details/user/orderDetail/${orderId}`);
    return request;
}

