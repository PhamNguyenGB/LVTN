import axiosClient from "./axiosClient";

export const pointsRedemption = async (currency) => {
    const request = await axiosClient.get(`/point/redemption/${currency}`);
    return request;
};