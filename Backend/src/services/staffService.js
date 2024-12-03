require("dotenv").config();
import db from '../models/index';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getStoredOtp, deleteStoredOtp } from './sendOTPService';
import fs from 'fs';
import path from 'path';
import { Op } from 'sequelize';

const salt = bcrypt.genSaltSync(10);

const funHashPassWord = (password) => {
    let hash = bcrypt.hashSync(password, salt);
    return hash
}

export const checkEmailStaff = async (email) => {
    const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (emailReg.test(String(email).toLowerCase()) === true) {
        let staff = await db.Staff.findOne({
            where: { email: email },
        })
        if (staff) {
            return 'Email đã tồn tại';
        }
        return;
    }

    return 'Email không hợp lệ';
}

export const checkStaffPhone = async (phone) => {
    let yourPhone = await db.Staff.findOne({
        where: { phone: phone },
    })
    if (yourPhone) {
        return 'Số điện thoại đã được sử dụng';;
    }
    return;
}

const reristerStaff = async (staffData, providedOtp) => {
    try {
        const storedOtpData = await getStoredOtp(staffData.email);
        if (!storedOtpData) {
            return {
                status: 0,
                mess: 'OTP không tồn tại hoặc đã hết hạn',
            };
        }

        const { otp, expiresAt } = storedOtpData;

        if (Date.now() > expiresAt) {
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
        await deleteStoredOtp(staffData.email);

        let hashPass = await funHashPassWord(staffData.password);
        await db.Staff.create({
            fullname: staffData.fullname,
            birthdate: staffData.birthday,
            sex: staffData.sex,
            email: staffData.email,
            phone: staffData.phone,
            avatar: staffData.avatar,
            address: staffData.address,
            password: hashPass,
            role: 'staff',
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

const loginStaff = async (email, password) => {
    try {
        let staff = await db.Staff.findOne({
            where: { email: email }
        });

        if (staff) {
            let isCorrectPassword = await checkPassword(staff.password, password);
            if (isCorrectPassword === true) {
                let payload = {
                    fullname: staff.dataValues.fullname,
                    email: staff.dataValues.email,
                    address: staff.dataValues.address,
                    phone: staff.dataValues.phone,
                    role: staff.dataValues.role,
                    id: staff.dataValues.id,
                }
                let token = createJWT(payload);
                let refresh_token = refreshToken(payload);

                const data = {
                    access_token: token,
                    fullname: staff.dataValues.fullname,
                    email: staff.dataValues.email,
                    address: staff.dataValues.address,
                    phone: staff.dataValues.phone,
                    refreshToken: refresh_token,
                    role: staff.dataValues.role,
                    avatar: staff.dataValues.avatar,
                    birthday: staff.dataValues.birthdate,
                    sex: staff.dataValues.sex,
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
            mess: 'Error from login staff',
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

const updateAvatar = async (file, staffId) => {
    try {
        const staff = await db.Staff.findOne({
            where: { id: staffId }
        });
        if (staff) {

            await deleteFile(staff.avatar);

            staff.update({
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

const updateInfo = async (data, staffId) => {
    try {
        const staff = await db.Staff.findOne({
            where: { id: staffId },
        });
        if (staff) {
            staff.update({
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

const chancePassword = async (oldPass, newPass, staff) => {
    try {
        const infoStaff = await db.Staff.findOne({
            where: { id: staff.id },
        });

        const match = await bcrypt.compare(oldPass, infoStaff.password);

        if (match) {
            let hashPass = await funHashPassWord(newPass);
            await infoStaff.update({
                password: hashPass,
            });

            return {
                status: 0,
                mess: 'Cập nhật mật khẩu thành công',
            }
        }

        return {
            status: -1,
            mess: 'Cập nhật mật khẩu thất bại'
        }
    } catch (error) {
        console.log(error);
        return {
            status: -1,
            mess: 'Cập nhật mật khẩu thất bại!!!'
        }
    }
}

const getAllStaffs = async () => {
    try {
        const data = await db.Staff.findAll({
            where: { role: { [Op.ne]: 'admin' } }
        });
        return {
            status: 0,
            data: data,
        };
    } catch (error) {
        console.log(error);
        return {
            status: -1,
            data: '',
        };
    }
}

const deleteRole = async (staffId) => {
    try {
        const staff = await db.Staff.findOne({
            where: { id: staffId },
        });
        if (staff) {
            staff.update({
                role: '',
            });
        }
        return {
            status: 0,
            mess: 'Xóa quyền quản lý thành công'
        }
    } catch (error) {
        console.log(error);
        return {
            status: -1,
            mess: 'Xóa quyền quản lý thất bại'
        }
    }
}

const resetRole = async (staffId) => {
    try {
        const staff = await db.Staff.findOne({
            where: { id: staffId },
        });
        if (staff) {
            staff.update({
                role: 'staff',
            });
        }
        return {
            status: 0,
            mess: 'Reset quyền quản lý thành công'
        }
    } catch (error) {
        console.log(error);
        return {
            status: -1,
            mess: 'Reset quyền quản lý thất bại'
        }
    }
}

module.exports = {
    reristerStaff,
    loginStaff,
    createJWT,
    refreshToken,
    updateAvatar,
    updateInfo,
    chancePassword,
    getAllStaffs,
    deleteRole,
    resetRole,
};