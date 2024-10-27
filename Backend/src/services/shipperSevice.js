require("dotenv").config();
import db from '../models/index';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const salt = bcrypt.genSaltSync(10);

const funHashPassWord = (password) => {
    let hash = bcrypt.hashSync(password, salt);
    return hash
}

export const checkEmailShipper = async (email) => {
    const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (emailReg.test(String(email).toLowerCase()) === true) {
        let staff = await db.Shipper.findOne({
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
    let yourPhone = await db.Shipper.findOne({
        where: { phone: phone },
    })
    if (yourPhone) {
        return 'Số điện thoại đã được sử dụng';;
    }
    return;
}

const registerShipper = async (shipperData) => {
    try {
        // const storedOtpData = await getStoredOtp(staffData.email);
        // if (!storedOtpData) {
        //     return {
        //         status: 0,
        //         mess: 'OTP không tồn tại hoặc đã hết hạn',
        //     };
        // }

        // const { otp, expiresAt } = storedOtpData;

        // if (Date.now() > expiresAt) {
        //     return {
        //         status: 0,
        //         mess: 'OTP đã hết hạn',
        //     };
        // }

        // if (providedOtp !== otp) {
        //     return {
        //         status: 0,
        //         mess: 'OTP không hợp lệ',
        //     };
        // }

        // // Xóa OTP sau khi xác thực thành công
        // await deleteStoredOtp(staffData.email);

        let hashPass = await funHashPassWord(shipperData.password);
        await db.Shipper.create({
            fullname: shipperData.fullname,
            sex: shipperData.sex,
            email: shipperData.email,
            phone: shipperData.phone,
            avatar: shipperData.avatar,
            address: shipperData.address,
            password: hashPass,
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

const loginShipper = async (email, password) => {
    try {
        let shipper = await db.Shipper.findOne({
            where: { email: email }
        });

        if (shipper) {
            let isCorrectPassword = await checkPassword(shipper.password, password);
            if (isCorrectPassword === true) {
                let payload = {
                    fullname: shipper.dataValues.fullname,
                    email: shipper.dataValues.email,
                    address: shipper.dataValues.address,
                    phone: shipper.dataValues.phone,
                    role: 'shipper',
                    id: shipper.dataValues.id,
                }
                let token = createJWT(payload);
                let refresh_token = refreshToken(payload);

                const data = {
                    access_token: token,
                    fullname: shipper.dataValues.fullname,
                    email: shipper.dataValues.email,
                    address: shipper.dataValues.address,
                    phone: shipper.dataValues.phone,
                    refreshToken: refresh_token,
                    role: 'shipper',
                    avatar: shipper.dataValues.avatar,
                    sex: shipper.dataValues.sex,
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
            mess: 'Error from login shipper',
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

const updateAvatar = async (file, shipperId) => {
    try {
        const shipper = await db.Shipper.findOne({
            where: { id: shipperId }
        });
        if (shipper) {

            await deleteFile(shipper.avatar);

            shipper.update({
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
            mess: 'Không tìm thấy người giao hàng',
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

const updateInfo = async (data, shipperId) => {
    try {
        const shipper = await db.Shipper.findOne({
            where: { id: shipperId },
        });
        if (shipper) {
            shipper.update({
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
            mess: 'Không tìm thấy thông tin shipper',
        }
    } catch (error) {
        console.log(error);
        return {
            status: -1,
            mess: 'Cập nhật thông tin thất bại',
        }
    }
}

module.exports = {
    registerShipper,
    loginShipper,
    updateAvatar,
    updateInfo,
    createJWT,
    refreshToken,
}
