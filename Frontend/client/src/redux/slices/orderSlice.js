import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addOrder = createAsyncThunk(
    'order/addOrder',
    async (data) => {
        let request = await axios.post('http://localhost:8080/api/order/addOrder', data);
        return request.data;
    }
)

export const getOrderById = createAsyncThunk(
    'order/getOrderById',
    async (access_token) => {
        let request = await axios.get('http://localhost:8080/api/order/getOrderById', {
            headers: { token: `Bearer ${access_token}` }
        });
        return request.data;
    }
)

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        loading: false,
        error: null,
        mess: '',
        yourOrder: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(addOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.mess = '';
            })
            .addCase(addOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.mess = action.payload.Mess;
            })
            .addCase(addOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.mess = action.payload.Mess;
            })

            // get order by id
            .addCase(getOrderById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrderById.fulfilled, (state, action) => {
                state.loading = true;
                state.error = null;
                state.yourOrder = action.payload?.Data;
            })
            .addCase(getOrderById.rejected, (state, action) => {
                state.loading = true;
                state.error = action.payload?.Mess;
                state.yourOrder = null;
            })
    }
})

export default orderSlice.reducer;