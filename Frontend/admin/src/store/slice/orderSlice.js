import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosClient from "../../api/axiosClient";


export const fetAllOrder = createAsyncThunk(
    'order/fetAll',
    async () => {
        const response = await axiosClient.get('/order/');
        return response;
    }
)

export const updateStatusOrder = createAsyncThunk(
    'order/updateStatus',
    async ({ data, access_token }) => {
        let request = await axiosClient.put('/order/updateStatus', data);
        return request;
    },
)


const orderSlice = createSlice({
    name: 'order',
    initialState: {
        loading: false,
        orders: null,
        error: null,
    },

    extraReducers: (builder) => {
        builder
            // get all orders
            .addCase(fetAllOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.orders = null;
            })
            .addCase(fetAllOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.error = action.payload?.Mess;
                state.orders = action.payload?.Data;
            })
            .addCase(fetAllOrder.rejected, (state, action) => {
                state.loading = true;
                state.error = action.payload?.Mess;
                state.orders = null;
            })

            //update order status
            .addCase(updateStatusOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateStatusOrder.fulfilled, (state, action) => {
                state.loading = true;
                state.error = action.payload?.Mess;
            })
            .addCase(updateStatusOrder.rejected, (state, action) => {
                state.loading = true;
                state.error = action.payload?.Mess;
            })
    }
});

export default orderSlice.reducer;