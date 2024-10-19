import axiosClient from "./axiosClient";

export const fetAllOrder = async () => {
    const response = await axiosClient.get('/order/staff');
    return response;
}
