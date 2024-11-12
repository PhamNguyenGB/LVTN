require('dotenv').config();
import db from '../models/index';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getStoredOtp, deleteStoredOtp } from './sendOTPService';
import fs from 'fs';
import path from 'path';

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
            levelId: 1,
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
            where: { email: email },
            include: {
                model: db.Level,
                attributes: ['id', 'name']
            }
        });

        if (user) {
            let isCorrectPassword = await checkPassword(user.password, password);
            if (isCorrectPassword === true) {
                let payload = {
                    fullname: user.dataValues.fullname,
                    email: user.dataValues.email,
                    role: 'user',
                    Level: user.dataValues.Level,
                    id: user.dataValues.id,
                }
                let token = createJWT(payload);
                let refresh_token = refreshToken(payload);

                const data = {
                    access_token: token,
                    fullname: user.dataValues.fullname,
                    email: user.dataValues.email,
                    phone: user.dataValues.phone,
                    address: user.dataValues.address,
                    refreshToken: refresh_token,
                    avatar: user.dataValues.avatar,
                    Level: user.dataValues.Level,
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

const updateAvatar = async (file, userId) => {
    try {
        const user = await db.User.findOne({
            where: { id: userId }
        });
        if (user) {

            await deleteFile(user.avatar);

            user.update({
                avatar: 'http://localhost:8080/image/' + file.filename
            })
            return {
                status: 0,
                mess: 'Cập nhật ảnh đại diện thành công',
                data: 'http://localhost:8080/image/' + file.filename,
            }
        }
        return {
            status: -1,
            mess: 'Không tìm thấy nhân viên',
        }
    } catch (error) {
        console.log(error);
        return {
            status: -1,
            mess: 'Lỗi cập nhật ảnh đại diện',
        }
    }
};

const deleteFile = async (images) => {
    try {
        const pathName = path.join(__dirname, '../assets/image/');
        const fileName = images.split('/')[4];

        await fs.unlink(pathName + fileName, (err) => console.log(err));

        return {
            mess: 'Xóa file hình ảnh thành công',
            status: 0,
        };
    } catch (error) {
        console.log(error);
        return {
            mess: 'error delete file',
            status: -1,
        };
    }
}

const updateInfo = async (data, userId) => {
    try {
        const user = await db.User.findOne({
            where: { id: userId },
        });
        if (user) {
            user.update({
                fullname: data.fullname,
                phone: data.phone,
                address: data.address,
            });
            return {
                status: 0,
                mess: 'Cập nhật thông tin thành công',
                data: {
                    fullname: data.fullname,
                    phone: data.phone,
                    address: data.address,
                }
            }
        }
        return {
            status: -1,
            mess: 'Không tìm thấy thông tin nhân viên',
        }
    } catch (error) {
        console.log(error);
        return {
            status: -1,
            mess: 'Cập nhật thông tin thất bại',
        }
    }
}

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
        let users = await db.User.findAll({
            include: { model: db.Level },
        });
        return {
            status: 0,
            data: users
        };
    } catch (error) {
        console.log(error);
        return {
            status: -1,
            mess: 'error'
        };
    }
};

const getInfoById = async (user) => {
    try {
        const info = await db.User.findOne({
            where: { id: user.id },
        });
        return {
            status: 0,
            data: info,
        }
    } catch (error) {
        console.log(error);
        return {
            status: -1,
            mess: 'Lỗi lấy thông tin người dùng'
        }
    }
}

const decreasePointUser = async (decreasePoint, email) => {
    try {
        const user = await db.User.findOne({
            where: { email: email }
        });
        if (user) {
            const newPoint = user.point - decreasePoint;
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

const increatePointUser = async (data) => {
    try {
        const user = await db.User.findOne({
            where: { id: data.userId }
        });
        user.update({
            point: data.point
        })
        return { status: 0 }
    } catch (error) {
        console.log(error);
        return { status: -1 }
    }
}

const UpdateLevel = async (data) => {
    try {
        const user = await db.User.findOne({
            where: { id: data.userId }
        })
        if (user) {
            await user.update({
                levelId: data.levelId,
            });
            return {
                status: 0,
                mess: 'Cập nhật cấp bậc thành công'
            }
        }
        return {
            status: -1,
            mess: 'Không tìm thấy người dùng'
        }
    } catch (error) {
        console.log(error);
        return {
            status: -1,
            mess: error.message,
        }
    }
}


module.exports = {
    registerUser,
    loginUser,
    createJWT,
    refreshToken,
    statisticUsers,
    getAllUsersService,
    checkEmailUser,
    checkUserPhone,
    decreasePointUser,
    updateAvatar,
    updateInfo,
    increatePointUser,
    getInfoById,
    UpdateLevel,
}