import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosClient from "../../api/axiosClient";

export const fetAllProducts = createAsyncThunk(
    '/products',
    async () => {
        const request = await axios.get('http://localhost:8080/api/products');
        return request;
    }
)

export const fetchAllListProducts = createAsyncThunk(
    '/products/GetAll',
    async ({ listId, currentPage, currentLimit }) => {
        const request = await axiosClient.get(`/products/fetAllList/${listId}/${currentPage}/${currentLimit}`);
        return request;
    }
)

export const getTypeProduct = createAsyncThunk(
    '/products/type',
    async (type) => {
        const request = await axios.get(`http://localhost:8080/api/products/${type}`);
        return request.data;
    }
)

// export const getProductByID = createAsyncThunk(
//     'product/id',
//     async (id) => {
//         const request = await axios.get(`http://localhost:8080/api/products/oneProduct/${id}`);
//         return request.data;
//     }
// )

export const getSimilarProduct = createAsyncThunk(
    'product/similar',
    async ({ type, idProduct }) => {
        const request = await axios.get(`http://localhost:8080/api/products/similar/${type}/${idProduct}`);
        return request.data;

    }
)

export const productsFilterPrice = createAsyncThunk(
    'product/filters/price',
    async ({ type, price }) => {
        console.log(type, price);
        const request = await axios.get(`http://localhost:8080/api/products/filter/${type}/${price}`);
        return request.data;
    }
)

export const searchProducts = createAsyncThunk(
    'product/search',
    async ({ name }) => {
        const request = await axios.get(`http://localhost:8080/api/products/search/${name}`);
        return request.data;
    }
)


const productSlice = createSlice({
    name: "product",
    initialState: {
        loading: false,
        products: null,
        product: null,
        error: null,
        similarProducts: null,
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchAllListProducts.pending, (state) => {
                state.loading = true;
                state.products = null;
                state.error = null;
            })
            .addCase(fetchAllListProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
                state.error = null;
            })
            .addCase(fetchAllListProducts.rejected, (state, action) => {
                state.loading = false;
                state.products = null;
                state.error = action.payload.data?.Mess;
            })

            //Get type of product
            .addCase(getTypeProduct.pending, (state) => {
                state.loading = true;
                state.products = null;
                state.error = null;
            })
            .addCase(getTypeProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;;
                state.error = action.payload?.Mess;
            })
            .addCase(getTypeProduct.rejected, (state, action) => {
                state.loading = false;
                state.products = null;
                state.error = action.payload?.Mess;
            })

            // //Get product by id
            // .addCase(getProductByID.pending, (state) => {
            //     state.loading = true;
            //     state.product = null;
            //     state.error = null;
            // })
            // .addCase(getProductByID.fulfilled, (state, action) => {
            //     state.loading = false;
            //     state.product = action.payload;
            //     state.error = action.payload?.Mess;
            // })
            // .addCase(getProductByID.rejected, (state, action) => {
            //     state.loading = false;
            //     state.product = null;
            //     state.error = action.payload?.Mess;
            // })

            //Get similar products
            .addCase(getSimilarProduct.pending, (state) => {
                state.loading = true;
                state.similarProducts = null;
                state.error = null;
            })
            .addCase(getSimilarProduct.fulfilled, (state, action) => {
                state.loading = true;
                state.similarProducts = action.payload;
                state.error = action.payload?.Mess;
            })
            .addCase(getSimilarProduct.rejected, (state, action) => {
                state.loading = true;
                state.similarProducts = action.payload;
                state.error = action.payload?.Mess;
            })

            // product filters price
            .addCase(productsFilterPrice.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(productsFilterPrice.fulfilled, (state, action) => {
                console.log("check action", action.payload);
                state.loading = false;
                state.products = action.payload;
                state.error = null;
            })
            .addCase(productsFilterPrice.rejected, (state, action) => {
                state.loading = false;
                state.error = 'Lỗi khi lọc sản phẩm';
            })

            // search products
            .addCase(searchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
                state.error = action.payload?.Mess;
            })
            .addCase(searchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.Mess;
            })
    },
})

export default productSlice.reducer;
