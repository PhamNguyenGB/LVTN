import axiosClient from "./axiosClient";

export const findEventByName = async (nameEvent) => {
    const request = await axiosClient.get(`/event/findOne/${nameEvent}`);
    return request;
};