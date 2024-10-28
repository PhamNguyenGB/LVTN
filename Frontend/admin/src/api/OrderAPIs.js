import axiosClient from "./axiosClient";

export const fetAllOrder = async () => {
    const response = await axiosClient.get('/order/staff');
    return response;
}

export const updateStatusOrder = async (data) => {
    const response = await axiosClient.put('/order/staff/update/status', data);
    return response;
}