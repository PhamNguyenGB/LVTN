import axiosClient from "./axiosClient";

export const fetchNew4Products = async () => {
    const request = await axiosClient.get('/products/new4Product');
    return request;
};

export const fetchNewProducts = async () => {
    const request = await axiosClient.get('/products/newProduct');
    return request;
};

export const fetchAllListProducts = async (listId, currentPage, currentLimit) => {
    const request = await axiosClient.get(`/products/fetAllList/${listId}/${currentPage}/${currentLimit}`);
    return request;
};

export const getProductByID = async (id) => {
    const request = await axiosClient.get(`/products/oneProduct/${id}`);
    return request;
}

export const filterProductsByBrandAndSize = async (brandArr, sizeArr, page, limit, listId) => {
    const request = await axiosClient.post(`/products/filter/brand/size`, { brandArr, sizeArr, page, limit, listId });
    return request;
}

export const getProductsSimilar = async (data) => {
    const request = await axiosClient.post('/products/similar', data);
    return request;
}

export const topSellingProducts = async () => {
    const request = await axiosClient.get('/Details/top/selling/products');
    return request;
}

export const searchProducts = async (name) => {
    const request = await axiosClient.get(`/products/search/${name}`);
    return request;
}

