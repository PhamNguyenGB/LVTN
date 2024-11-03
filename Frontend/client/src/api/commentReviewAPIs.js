import axiosClient from "./axiosClient";

export const getAllCommentById = async (idProduct, currentPage, currentLimit) => {
    const request = await axiosClient.get(`/comment/review/${idProduct}/${currentPage}/${currentLimit}`);
    return request;
};

export const createReviewAndComment = async (data) => {
    console.log('data', data);

    const request = await axiosClient.post(`/comment/review/create`, data);
    return request;
};

