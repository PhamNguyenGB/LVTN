import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosClient from "../../api/axiosClient"


export const loginUser = createAsyncThunk(
    'user/loginGoogle',
    async (userCredentials) => {
        console.log('check cai data', userCredentials);
        const data = await axiosClient.post('/social/auth/google/login', userCredentials);
        axiosClient.defaults.headers["token"] = `Bear ${data.data.access_token}`;
        window.localStorage.setItem('token', data.data.access_token);
        window.localStorage.setItem('refreshToken', data.data.refreshToken);

        return data;
    }
);

export const loginForm = createAsyncThunk(
    'user/loginForm',
    async (userCredentials) => {
        const data = await axiosClient.post('/user/login', userCredentials);
        axiosClient.defaults.headers["token"] = `Bear ${data.data.access_token}`;
        window.localStorage.setItem('token', data.data.access_token);
        window.localStorage.setItem('refreshToken', data.data.refreshToken);

        return data;
    }
);

export const logout = createAsyncThunk(
    'user/logout',
    async () => {
        // const request = await axiosClient.post('/user/logout', {});
        return;
    }
)

// export const updatePointUser = createAsyncThunk(
//     'user/update/point',
//     async ({ increasePoint, decreasePoint, email }) => {
//         const request = await axiosClient.post('/user/update/point', { increasePoint, decreasePoint, email });
//         return request;
//     }
// )

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        user: null,
        error: null,
    },

    extraReducers: (builder) => {
        builder
            // login google
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.user = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload?.data;
                state.mess = action.payload?.mess;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.mess = action.payload.error;
            })
            //Login form
            .addCase(loginForm.pending, (state) => {
                state.loading = true;
                state.user = null;
            })
            .addCase(loginForm.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload?.data;
                state.mess = action.payload?.mess;
            })
            .addCase(loginForm.rejected, (state, action) => {
                state.loading = false;
                state.mess = action.payload.error;
            })
            //logout
            .addCase(logout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.user = null;
            })

            .addCase(logout.rejected, (state, action) => {
                state.loading = true;
                state.error = 'Lỗi đăng xuất';
            })

    }
});

export default userSlice.reducer;