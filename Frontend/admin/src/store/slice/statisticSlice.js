import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosClient from "../../api/axiosClient";

export const statisticUsers = createAsyncThunk(
    'statistic/users',
    async () => {
        const request = await axiosClient.get('/user/statictis/users');
        return request;
    }
)

export const statisticMoneyMonth = createAsyncThunk(
    'statistic/moneyMonth',
    async ({ month }) => {
        const request = await axiosClient.post('/order/statisticsMonth', { month });
        return request;
    }
)

export const statisticMoneyYear = createAsyncThunk(
    'statistic/moneyYear',
    async ({ year }) => {
        const request = await axiosClient.post('/order/statisticsYear', { year });
        return request;
    }
)

export const fetAllUsers = createAsyncThunk(
    'statistic/fetAllUsers',
    async () => {
        const request = await axiosClient.get('/user/statictis/getAllUsers');
        return request;
    }
)

export const getTotalQuantity = createAsyncThunk(
    'statistic/totalQuantity',
    async () => {
        const request = await axiosClient.get('/Details/totalQuantity');
        return request;
    }
)

export const getDataStatisticMoneyYear = createAsyncThunk(
    'statistic/getDataYear',
    async ({ year }) => {
        const request = await axiosClient.post('/order/getData/moneyYear', { year });
        return request;
    }
)

export const getDataStatisticMoneyMonth = createAsyncThunk(
    'statistic/getDataMonth',
    async ({ month }) => {
        const request = await axiosClient.post('/order/getData/moneyMonth', { month });
        return request;
    }
)


const statisticSlice = createSlice({
    name: "product",
    initialState: {
        loading: false,
        totalUsers: null,
        moneyMonth: null,
        moneyYear: null,
        users: null,
        totalQuantity: null,
        statisticMoney: null,
        totalMoney: 0,
    },
    extraReducers: (builder) => {
        builder
            //statistic users
            .addCase(statisticUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(statisticUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.totalUsers = action.payload;
            })
            .addCase(statisticUsers.rejected, (state, action) => {
                state.loading = false;
            })

            //statistic money month
            .addCase(statisticMoneyMonth.pending, (state) => {
                state.loading = true;
            })
            .addCase(statisticMoneyMonth.fulfilled, (state, action) => {
                state.loading = false;
                state.moneyMonth = action.payload;
            })
            .addCase(statisticMoneyMonth.rejected, (state, action) => {
                state.loading = false;
            })

            //statistic money year
            .addCase(statisticMoneyYear.pending, (state) => {
                state.loading = true;
            })
            .addCase(statisticMoneyYear.fulfilled, (state, action) => {
                state.loading = false;
                state.moneyYear = action.payload;
            })
            .addCase(statisticMoneyYear.rejected, (state, action) => {
                state.loading = false;
            })

            //fetch all users
            .addCase(fetAllUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.users = null;
            })

            // total quantity
            .addCase(getTotalQuantity.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTotalQuantity.fulfilled, (state, action) => {
                state.loading = false;
                state.totalQuantity = action.payload;
            })
            .addCase(getTotalQuantity.rejected, (state, action) => {
                state.loading = false;
                state.totalQuantity = null;
            })

            //get data money month
            .addCase(getDataStatisticMoneyMonth.pending, (state) => {
                state.loading = true;
                state.statisticMoney = null;
                state.totalMoney = 0;
            })
            .addCase(getDataStatisticMoneyMonth.fulfilled, (state, action) => {
                state.loading = false;
                state.statisticMoney = action.payload;
                state.totalMoney = 0;
                action.payload.data.map((item) => {
                    state.totalMoney += item.totalCost;
                })
            })
            .addCase(getDataStatisticMoneyMonth.rejected, (state, action) => {
                state.loading = false;
            })

            //get data money year
            .addCase(getDataStatisticMoneyYear.pending, (state) => {
                state.loading = true;
                state.statisticMoney = null;
                state.totalMoney = 0;
            })
            .addCase(getDataStatisticMoneyYear.fulfilled, (state, action) => {
                state.loading = false;
                state.statisticMoney = action.payload;
                state.totalMoney = 0;
                action.payload.data.map((item) => {
                    state.totalMoney += item.totalCost;
                })
            })
            .addCase(getDataStatisticMoneyYear.rejected, (state, action) => {
                state.loading = false;
            })
    },
})

export default statisticSlice.reducer;
