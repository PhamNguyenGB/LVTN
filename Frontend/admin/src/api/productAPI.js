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
