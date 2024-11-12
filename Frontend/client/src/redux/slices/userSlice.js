import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosClient from "../../api/axiosClient"


export const loginUser = createAsyncThunk(
    'user/loginGoogle',
    async (userCredentials) => {
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

export const updateAvatar = createAsyncThunk(
    'user/updateAvatar',
    async (file) => {
        const data = await axiosClient.post('/user/avatar', file, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return data;
    }
);

export const updateInfo = createAsyncThunk(
    'user/updateInfo',
    async (dataUser) => {
        const data = await axiosClient.post('/user/update/info', dataUser);
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

export const getInfoById = createAsyncThunk(
    'user/getInfoById',
    async () => {
        const request = await axiosClient.get('/user/get/info');
        return request;
    }
)

export const decreasePointUser = createAsyncThunk(
    'user/decrease/point',
    async ({ decreasePoint, email }) => {
        const request = await axiosClient.post('/user/decreate/point', { decreasePoint, email });
        return request;
    }
)

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
            // Update Avatar
            .addCase(updateAvatar.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateAvatar.fulfilled, (state, action) => {
                state.loading = false;
                state.user.avatar = action.payload?.data;
                state.mess = action.payload?.mess;
            })
            .addCase(updateAvatar.rejected, (state, action) => {
                state.loading = false;
                state.mess = action.payload.error;
            })
            // Update info
            .addCase(updateInfo.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateInfo.fulfilled, (state, action) => {
                state.loading = false;
                console.log('check action', action.payload);

                state.user.fullname = action.payload?.data.fullname;
                state.user.phone = action.payload?.data.phone;
                state.user.address = action.payload?.data.address;
                state.mess = action.payload?.mess;
            })
            .addCase(updateInfo.rejected, (state, action) => {
                state.loading = false;
                state.mess = action.payload.error;
            })
            // decrease point
            .addCase(decreasePointUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(decreasePointUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user.point = action.payload?.data;
                state.mess = action.payload?.mess;
            })
            .addCase(decreasePointUser.rejected, (state, action) => {
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
            //get info user by id
            .addCase(getInfoById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getInfoById.fulfilled, (state, action) => {
                state.loading = false;
                state.error = action.payload?.mess;
                state.user = action.payload?.data;
            })

            .addCase(getInfoById.rejected, (state, action) => {
                state.loading = true;
                state.error = action.payload?.mess;
            })

    }
});

export default userSlice.reducer;