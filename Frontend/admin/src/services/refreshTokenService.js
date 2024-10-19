import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useSelector, useDispatch } from 'react-redux';
import { loginStaff } from "../store/slice/userSlice";

const refreshToken = async () => {
    try {
        const res = await axios.post('http://localhost:8080/api/staff/refresh',
            null,
            {
                withCredentials: true,

            });

        return res.data;
    } catch (error) {
        console.error("Error during token refresh:", error.response ? error.response.data : error.message);
    }
}

export const createAxios = (user, disPatch, stateSuccess) => {

    let axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(
        async (config) => {
            let date = new Date();
            const decodeToken = jwtDecode(user.access_token)

            if (decodeToken.exp < date.getTime() / 1000) {
                const data = await refreshToken(user.refreshToken);
                const refreshStaff = {
                    ...user,
                    access_token: data.access_token,
                }
                disPatch(stateSuccess(refreshStaff));
                config.headers["access_token"] = "Bearer " + data.access_token;
            }
            return config;
        },
        (error) => { return Promise.reject(error); },
    );
    return axiosJWT;
}
