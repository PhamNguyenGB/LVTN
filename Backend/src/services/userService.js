require('dotenv').config();
import db from '../models/index';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getStoredOtp, deleteStoredOtp } from './sendOTPService';


const salt = bcrypt.genSaltSync(10);

const funHashPassWord = (password) => {
    let hash = bcrypt.hashSync(password, salt);
    return hash
}

const checkEmailUser = async (email) => {
    const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (emailReg.test(String(email).toLowerCase()) === true) {
        let staff = await db.User.findOne({
            where: { email: email },
        })
        if (staff) {
            return 'Email đã tồn tại';
        }
        return;
    }

    return 'Email không hợp lệ';
}

const checkUserPhone = async (phone) => {
    let yourPhone = await db.User.findOne({
        where: { phone: phone },
    })
    if (yourPhone) {
        return 'Số điện thoại đã tồn tại';
    }
    return;
}

const registerUser = async (userData, providedOtp) => {
    try {
        const storedOtpData = await getStoredOtp(userData.email);
        if (!storedOtpData) {
            await deleteStoredOtp(userData.email);
            return {
                status: 0,
                mess: 'OTP không tồn tại vui lòng gửi lại!',
            };
        }

        const { otp, expiresAt } = storedOtpData;

        if (Date.now() > expiresAt) {
            await deleteStoredOtp(userData.email);
            return {
                status: 0,
                mess: 'OTP đã hết hạn',
            };
        }

        if (providedOtp !== otp) {
            return {
                status: 0,
                mess: 'OTP không hợp lệ',
            };
        }

        // Xóa OTP sau khi xác thực thành công
        await deleteStoredOtp(userData.email);

        let hashPass = await funHashPassWord(userData.password);
        await db.Staff.create({
            fullname: userData.fullname,
            sex: userData.sex,
            email: userData.email,
            phone: userData.phone,
            address: userData.address,
            password: hashPass,
            point: 0,

        })
        return {
            status: 0,
            mess: 'Tạo tài khoản thành công',
        };
    } catch (error) {
        console.log(error);
        return {
            status: -1,
            mess: 'Lỗi tạo tài khoản người dùng',
        };
    }
};

const checkPassword = (hashPass, password) => {
    return bcrypt.compareSync(password, hashPass);
};


const loginUser = async (email, password) => {
    try {
        let user = await db.User.findOne({
            where: { email: email }
        });

        if (user) {
            let isCorrectPassword = await checkPassword(user.password, password);
            if (isCorrectPassword === true) {
                let payload = {
                    fullname: user.dataValues.fullname,
                    email: user.dataValues.email,
                    role: 'user',
                    id: user.dataValues.id,
                }
                let token = createJWT(payload);
                let refresh_token = refreshToken(payload);

                const data = {
                    access_token: token,
                    fullname: user.dataValues.fullname,
                    email: user.dataValues.email,
                    refreshToken: refresh_token,
                    avatar: user.dataValues.avatar,
                    role: 'user',
                    point: user.dataValues.point,
                }
                return {
                    data: data,
                    mess: 'Đăng nhập thành công',
                    status: 0,
                };
            }
        }
        return {
            data: '',
            mess: 'Tài khoản hoặc mật khẩu không chính xác',
            status: 0
        };
    } catch (error) {
        console.log(error);
        return {
            data: '',
            mess: 'Error from login user',
            status: -1,
        };
    }
}

const createJWT = (payload) => {
    let key = process.env.JWT_SECRET;
    let token = null;
    try {
        token = jwt.sign(payload, key, { expiresIn: process.env.JWT_EXPIRES_IN });
    } catch (error) {
        console.log(error);
    }
    return token;
}

const refreshToken = (payload) => {
    let key = process.env.JWT_SECRET_REFRESH;
    let refreshToken = null;
    try {
        refreshToken = jwt.sign(payload, key, { expiresIn: process.env.JWT_REFRESH_IN });
    } catch (error) {
        console.log(error);
    }
    return refreshToken;
};

const statisticUsers = async () => {
    try {
        let users = await db.User.findAll({});
        let usersCount = 0;
        users.map((user, index) => {
            usersCount += 1;
        })
        return usersCount;
    } catch (error) {
        console.log(error);
        return;
    }
};

const getAllUsersService = async () => {
    try {
        let users = await db.User.findAll({});
        return users;
    } catch (error) {
        console.log(error);
        return;
    }
};

const updatePointUserSv = async (increasePoint, decreasePoint, email) => {
    try {
        const user = await db.User.findOne({
            where: { email: email }
        });
        if (user) {
            const newPoint = user.point - decreasePoint + increasePoint;
            user.update({
                point: newPoint,
            });
            return {
                status: 0,
                data: newPoint,
                mess: 'Cập nhật điểm thành công'
            };
        }
        return {
            status: -1,
            mess: 'Không tìm thấy user',
        }
    } catch (error) {
        console.log(error);
        return {
            status: -1,
            mess: 'Lỗi cập nhật điểm'
        }

    }
};


module.exports = {
    registerUser,
    loginUser,
    createJWT,
    refreshToken,
    statisticUsers,
    getAllUsersService,
    checkEmailUser,
    checkUserPhone,
    updatePointUserSv,
}