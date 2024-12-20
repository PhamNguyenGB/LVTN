import axiosClient from "./axiosClient";

export const fetAllProducts = async () => {
    const request = await axiosClient.get('/products');
    return request;
};

export const createProduct = async (dataproduct) => {
    const request = await axiosClient.post('/products/create', dataproduct, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return request;
};

export const updateProduct = async (dataproduct) => {
    const request = await axiosClient.put('/products/update', dataproduct, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return request;
};

export const deleteProduct = async (idProduct) => {
    const request = await axiosClient.delete(`http://localhost:8080/api/products/delete/${idProduct}`)
    return request;
};

export const addSoldProduct = async (data) => {
    const request = await axiosClient.post('/sold/product/create', data);
    return request;
};

// export const getAllSoldProducts = async () => {
//     const request = await axiosClient.get('/sold/product/getAll');
//     return request;
// };

export const updateQuantity = async (data) => {
    const request = await axiosClient.post('/products/update/quantity', data);
    return request;
}
