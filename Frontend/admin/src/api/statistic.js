import axiosClient from "./axiosClient";

export const monthlyRevenueReport = async (year) => {
    const request = await axiosClient.get(`/order/revenue/report/month/${year}`);
    return request;
};

export const orderStatistics = async (year) => {
    const request = await axiosClient.get(`/order/statistic/order/month/${year}`);
    return request;
};

export const ListCarStatistics = async (year) => {
    const request = await axiosClient.get(`/Details/statistic/list/product/car/month/${year}`);
    return request;
}

export const ListSpecializedVehicleStatistics = async (year) => {
    const request = await axiosClient.get(`/Details/statistic/list/product/specialized/vehicle/month/${year}`);
    return request;
}

export const ListPlaneStatistics = async (year) => {
    const request = await axiosClient.get(`/Details/statistic/list/product/plane/month/${year}`);
    return request;
}

export const getOrderStatusStatistics = async () => {
    const request = await axiosClient.get(`/order/statistic/order/status`);
    return request;
}


