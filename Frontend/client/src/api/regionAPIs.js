import axiosClient from "./axiosClient";

export const fetchAllRegion = async () => {
    const request = await axiosClient.get('/region/all');
    return request;
};