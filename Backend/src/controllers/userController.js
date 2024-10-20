require("dotenv").config();
import UserService from '../services/userService';
import jwt from 'jsonwebtoken';

let refreshTokensArr = [];

const register = async (req, res) => {
    try {
        let data = await UserService.registerUser(req.body, req.body.otp);
        if (data.status === 0)
            return res.status(200).json({
                status: 0,
                mess: data.mess,
            });
        return res.status(500).json({
            status: -1,
            mess: data.mess,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: -1,
            mess: 'error from server register user',
        });
    }
};

const loginUser = async (req, res) => {
    try {
        let response = await UserService.loginUser(req.body.email, req.body.password);
        return res.status(200).json({
            data: response.data,
            mess: response.mess,
            status: response.status,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mess: 'error from server login user',
            status: -1,
        });
    }
};

const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refresh_token;
        if (!refreshToken) {
            return res.status(401).json({
                Mess: 'Bạn chưa đăng nhập',
                ErrC: 1,
            });
        }

        jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH, (err, user) => {
            if (err) {
                return res.status(401).json({ error_code: 2 })
            }
            refreshTokensArr = refreshTokensArr.filter(
                (token) => token !== refreshToken
            );
            // create new access token
            let payload = {
                fullname: user.fullname,
                email: user.email,
                role: 'user',
            }
            const newAccessToken = UserService.createJWT(payload);
            // const newFrefreshToken = UserService.refreshToken(payload);

            return res.status(200).json({
                access_token: newAccessToken,
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            Mess: 'Error from refresh',
            ErrC: -1,
        })
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie("refresh_token");
        refreshTokensArr = refreshTokensArr.filter(
            (token) => token !== req.cookies.refreshToken
        );
        return res.status(200).json({
            Mess: 'Đăng xuất thành công',
            ErrC: 0,
        });
    } catch (error) {
        console.log(error);
        res.status(200).json({
            Mess: 'Error from logout user',
            ErrC: -1,
        })
    }
};

const statisticUsers = async (req, res) => {
    try {
        const totalUsers = await UserService.statisticUsers();
        return res.status(200).json({ totalUsers });
    } catch (error) {
        console.log(error);
        return res.status(500).json('error from statisticUsers');
    }
};

const getAllUsers = async (req, res) => {
    try {
        const data = await UserService.getAllUsersService();
        return res.status(200).json({ data });
    } catch (error) {
        console.log(error);
        return res.status(500).json('error from getAllUsers');
    }
};

const verifyGoogleToken = async (req, res) => {
    const token = req.body.token;
    try {
        const userData = await UserService.verifyGoogleTokenService(token);
        return res.status(200).json({ userData });
    } catch (error) {
        console.log(error);
        return res.status(500).json('error login google');
    }
};

const updatePointUser = async (req, res) => {
    try {
        const decreasePoint = req.body.decreasePoint;
        const increasePoint = req.body.increasePoint;
        const email = req.body.email;

        const request = await UserService.updatePointUserSv(increasePoint, decreasePoint, email);
        if (request.status === 0)
            return res.status(200).json({
                status: 0,
                data: request.data,
                mess: request.mess
            });
        return res.status(500).json({
            status: -1,
            mess: request.mess
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: -1,
            mess: 'Lỗi cập nhật điểm thưởng'
        });
    }
};

module.exports = {
    register,
    loginUser,
    refreshToken,
    logout,
    statisticUsers,
    getAllUsers,
    verifyGoogleToken,
    updatePointUser,
}