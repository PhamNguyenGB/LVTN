import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient"


export const loginStaff = createAsyncThunk(
    'staff/loginStaff',
    async (userCredentials) => {
        const data = await axiosClient.post('/staff/login', userCredentials);
        axiosClient.defaults.headers["token"] = `Bear ${data.data.access_token}`;
        window.localStorage.setItem('token', data.data.access_token);
        window.localStorage.setItem('refreshToken', data.data.refreshToken);

        return data;
    }
);

export const updateAvatar = createAsyncThunk(
    'staff/updateAvatar',
    async (file) => {
        const data = await axiosClient.post('/staff/avatar', file, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return data;
    }
);

export const updateInfo = createAsyncThunk(
    'staff/updateInfo',
    async (dataStaff) => {
        const data = await axiosClient.post('/staff/info', dataStaff);
        return data;
    }
);

export const logout = createAsyncThunk(
    'staff/logout',
    async () => {
        return;
    }
);



const userSlice = createSlice({
    name: 'staff',
    initialState: {
        loading: false,
        staff: null,
        mess: null,
    },

    extraReducers: (builder) => {
        builder
            .addCase(loginStaff.pending, (state) => {
                state.loading = true;
                state.staff = null;
            })
            .addCase(loginStaff.fulfilled, (state, action) => {
                state.loading = false;
                state.staff = action.payload?.data;
                state.mess = action.payload?.mess;
            })
            .addCase(loginStaff.rejected, (state, action) => {
                state.loading = false;
                state.mess = action.payload.error;
            })
            // Update Avatar
            .addCase(updateAvatar.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateAvatar.fulfilled, (state, action) => {
                state.loading = false;
                state.staff.avatar = action.payload?.data;
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
                state.staff.fullname = action.payload?.data.fullname;
                state.staff.phone = action.payload?.data.phone;
                state.staff.address = action.payload?.data.address;
                state.mess = action.payload?.mess;
            })
            .addCase(updateInfo.rejected, (state, action) => {
                state.loading = false;
                state.mess = action.payload.error;
            })
            //logout
            .addCase(logout.pending, (state) => {
                state.loading = true;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.loading = false;
                state.staff = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
            })
    }
});

export default userSlice.reducer;