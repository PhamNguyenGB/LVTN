import axiosClient from "./axiosClient";

export const fetAllRegion = async () => {
    const request = await axiosClient.get('/region');
    return request;
};

export const createRegion = async (dataRegion) => {
    const request = await axiosClient.post('/region/create', dataRegion);
    return request;
};

export const updateRegion = async (dataRegion) => {
    const request = await axiosClient.put('/region/update', dataRegion);
    return request;
};

export const deleteRegion = async (regionId) => {
    const request = await axiosClient.delete(`/region/delete/${regionId}`);
    return request;
};
