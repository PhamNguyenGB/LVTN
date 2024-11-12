import axiosClient from "./axiosClient";

export const fetAllLevels = async () => {
    const request = await axiosClient.get('/level');
    return request;
};

export const createLevel = async (dataLevel) => {
    const request = await axiosClient.post('/level/create', dataLevel);
    return request;
};

export const updateLevel = async (dataLevel) => {
    const request = await axiosClient.put('/level/update', dataLevel);
    return request;
};

export const deleteLevel = async (levelId) => {
    const request = await axiosClient.delete(`/level/delete/${levelId}`);
    return request;
};
