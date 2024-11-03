import axiosClient from "./axiosClient";

export const zaloPay = async (totalAmout) => {
    const request = await axiosClient.post(`/payment/online/zaloPay`, totalAmout);
    return request;
};

export const callbackVNPay = async (params) => {

    const request = await axiosClient.get(`/payment/online/vnpay_ipn?${params}`);
    return request;
}

export const VNPay = async (data) => {
    const request = await axiosClient.post('/payment/online/create_payment_url', data);
    return request;
};