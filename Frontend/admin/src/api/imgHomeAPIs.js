import axiosClient from "./axiosClient";

export const fetAllImgHome = async () => {
    const request = await axiosClient.get('/image/home');
    return request;
};

export const createImgHome = async (dataImgHome) => {
    console.log('check dataImgHome', dataImgHome);

    const request = await axiosClient.post('/image/home/create', dataImgHome, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return request;
};

export const deleteImgHome = async (imgHomeId) => {
    const request = await axiosClient.delete(`/image/home/delete/${imgHomeId}`);
    return request;
};
