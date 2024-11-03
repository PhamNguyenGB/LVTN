import axiosClient from "./axiosClient";

export const fetAllReview = async () => {
    const request = await axiosClient.get('/comment/review/getall');
    return request;
};

export const repComment = async (data) => {
    const request = await axiosClient.post('/comment/review/repcomment/create', data);
    return request;
};
