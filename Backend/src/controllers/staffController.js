require("dotenv").config();
import e from 'express';
import staffService from '../services/staffService';
import jwt from 'jsonwebtoken';

let refreshTokensArr = [];

const reristerStaff = async (req, res) => {
    try {
        let data = await staffService.reristerStaff(req.body, req.body.otp);
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
            mess: 'error from server registerStaff',
        });
    }
};

const login = async (req, res) => {
    try {
        let response = await staffService.loginStaff(req.body.email, req.body.password);
        return res.status(200).json({
            data: response.data,
            mess: response.mess,
            status: response.status,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mess: 'error from server login staff',
            status: -1,
        });
    }
};

const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.body.refresh_token;
        if (!refreshToken) {
            return res.status(401).json({
                mess: 'Bạn chưa đăng nhập',
                status: 1,
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
                id: user.id,
                fullname: user.fullname,
                email: user.email,
                address: user.address,
                phone: user.phone,
                role: user.role,
            }
            const newAccessToken = staffService.createJWT(payload);
            // const newFrefreshToken = staffService.refreshToken(payload);
            return res.status(200).json({
                access_token: newAccessToken,
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json('Error from refresh');
    }
};

const updateAvatar = async (req, res) => {
    try {
        const request = await staffService.updateAvatar(req.file, req.user.id);
        if (request.status === 0)
            return res.status(200).json({
                status: 0,
                mess: request.mess,
                data: request.data,
            })
        return res.status(500).json({
            status: -1,
            mess: request.mess,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: -1,
            mess: 'error from update avatar',
        });
    }
};

const updateInfoStaff = async (req, res) => {
    try {
        const request = await staffService.updateInfo(req.body, req.user.id);
        if (request.status === 0)
            return res.status(200).json({
                status: 0,
                mess: request.mess,
                data: request.data,
            });
        return res.status(500).json({
            status: -1,
            mess: request.mess,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: -1,
            mess: 'error from update info staff',
        });

    }
};

module.exports = {
    reristerStaff,
    login,
    refreshToken,
    updateAvatar,
    updateInfoStaff,
}