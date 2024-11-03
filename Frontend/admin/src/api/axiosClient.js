import axios from "axios";
import queryString from "query-string";
import { useHistory } from 'react-router-dom';


const axiosClient = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "content-type": "application/json",
        "token": `Bear ${window.localStorage.getItem("token")}`,
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    return config;
})

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
    },
    async (error) => {
        if (error.response?.status === 401) {
            if (error.response.data.error_code === 1) {
                const refresh_token = localStorage.getItem('refreshToken');
                const token = await refreshToken(refresh_token);
                if (token) {
                    window.localStorage.removeItem('token');
                    window.localStorage.setItem('token', token);

                    const config = error.response.config;
                    config.headers["token"] = `Bear ${token}`;
                    return axiosClient(config);
                }
            } else if (error.response.data.error_code === 2) {
                localStorage.clear();
                window.location.href = '/login';
            }
            axiosClient.defaults.headers["token"] = null;
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("refresh-token");
            return error.response;
        }
        return error.response?.data || "SERVER_ERROR";
    }
);

const refreshToken = async (refresh_token) => {
    try {
        const res = await axiosClient.post('/staff/refresh',
            {
                refresh_token,
            });
        return res.access_token;
    } catch (error) {
        console.error("Error during token refresh:", error.response ? error.response.data : error.message);
    }
}

export default axiosClient