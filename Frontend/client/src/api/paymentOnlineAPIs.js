import axiosClient from "./axiosClient";

export const zaloPay = async (totalAmout) => {
    const request = await axiosClient.post(`/payment/online/zaloPay`, totalAmout);
    return request;
};