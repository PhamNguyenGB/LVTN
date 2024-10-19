import axiosClient from "./axiosClient";

export const getAllCommentById = async (idProduct, currentPage, currentLimit) => {
    const request = await axiosClient.get(`/comment/review/${idProduct}/${currentPage}/${currentLimit}`);
    return request;
};