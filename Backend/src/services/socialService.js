require('dotenv').config();
import db from '../models/index';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const loginUserSocial = async (email, name, image) => {
    try {
        let user = await db.User.findOne({
            where: { email: email }
        });

        if (user) {

            let payload = {
                fullname: user.fullname,
                email: user.email,
            }

            let token = createJWT(payload);
            let refresh_token = refreshToken(payload);

            const data = {
                access_token: token,
                fullname: user.dataValues.fullname,
                email: user.dataValues.email,
                refreshToken: refresh_token,
                avatar: user.dataValues?.avatar,
                imgGG: image
            }
            return {
                data: data,
                mess: 'Đăng nhập thành công',
                status: 0,
            };

        } else {
            await db.User.create({
                fullname: name,
                email: email,
                point: 0,
            });

            let payload = {
                fullname: name,
                email: email,
            }

            let token = createJWT(payload);
            let refresh_token = refreshToken(payload);

            const data = {
                access_token: token,
                fullname: name,
                email: email,
                refreshToken: refresh_token,
                imgGG: image
            }
            return {
                data: data,
                mess: 'Đăng nhập thành công',
                status: 0,
            };
        }

    } catch (error) {
        console.log(error);
        return {
            data: '',
            mess: 'Error from login user social',
            status: -1,
        };
    }
};

const createJWT = (payload) => {
    const key = process.env.JWT_SECRET;
    try {
        const token = jwt.sign(payload, key, { expiresIn: process.env.JWT_EXPIRES_IN });
        return token;
    } catch (error) {
        console.log(error);
        return;
    }
}

const refreshToken = (payload) => {
    let key = process.env.JWT_SECRET_REFRESH;
    let refreshToken = null;
    try {
        refreshToken = jwt.sign(payload, key, { expiresIn: process.env.JWT_REFRESH_IN });
    } catch (error) {
        console.log(error);
        return;
    }
    return refreshToken;
};

module.exports = {
    loginUserSocial,
}