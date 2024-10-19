import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getOrderDetail = createAsyncThunk(
    'orderDetail/fetAll',
    async ({ orderId, shipping, status }) => {
        let request = await axios.get(`http://localhost:8080/api/Details/getOrderDetail/${orderId}`);
        return { ...request.data, shipping, status };
    }
)

const orderDetailSlice = createSlice({
    name: 'orderDetail',
    initialState: {
        loading: false,
        products: null,
        shipping: 0,
        error: null,
        totalAmout: 0,
        status: '',
    },

    extraReducers: (builder) => {
        builder
            .addCase(getOrderDetail.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.products = null;
            })
            .addCase(getOrderDetail.fulfilled, (state, action) => {
                state.totalAmout = 0;
                state.loading = false;
                state.error = action.payload?.Mess;
                state.shipping = action.payload?.shipping;
                state.products = action.payload?.Data;
                state.status = action.payload?.status;
                action.payload.Data?.map((item) => {
                    if (item.price) {
                        state.totalAmout += item.price * item.quantity;
                    }
                })
            })
            .addCase(getOrderDetail.rejected, (state, action) => {
                state.loading = true;
                state.error = action.payload?.Mess;
                state.products = null;
            })
    }
});

export default orderDetailSlice.reducer;