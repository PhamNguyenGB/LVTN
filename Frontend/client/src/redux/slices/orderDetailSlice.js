import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addOrderDetail = createAsyncThunk(
    'addOrderDetail',
    async (data) => {
        console.log(data);
        let request = await axios.post('http://localhost:8080/api/Details/addOrderDetail', data);
        return request.data;
    }
)

export const getOrderDetail = createAsyncThunk(
    'getYourOrderDetails',
    async (orderId) => {
        let request = await axios.get(`http://localhost:8080/api/Details/getOrderDetail/${orderId.id}`);
        return request.data;
    }
)

const orderDetailSlice = createSlice({
    name: 'orderDetail',
    initialState: {
        loading: false,
        error: null,
        products: null,
        mess: '',
    },
    extraReducers: (builder) => {
        builder
            .addCase(addOrderDetail.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.mess = '';
            })
            .addCase(addOrderDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.mess = action.payload.Mess;
            })
            .addCase(addOrderDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.mess = action.payload.Mess;
            })

            // get your order details
            .addCase(getOrderDetail.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.products = null;
            })
            .addCase(getOrderDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.error = action.payload?.Mess;
                state.products = action.payload?.Data;
                state.status = action.payload?.status;
            })
            .addCase(getOrderDetail.rejected, (state, action) => {
                state.loading = true;
                state.error = action.payload?.Mess;
                state.products = null;
            })
    }
})

export default orderDetailSlice.reducer;