require("dotenv").config();
import { checkStaffPhone, checkEmailStaff } from './staffService';
import { checkUserPhone, checkEmailUser } from './userService';
const randomstring = require("randomstring");
const nodemailer = require('nodemailer');
import { client } from '../config/connectRedis';
import db from '../models';
import bcrypt from 'bcryptjs';


// client.connect();

const generateOTP = () => {
    return randomstring.generate({ length: 4, charset: 'numeric' });
};

const saveOtp = async (email, otp, expiresAt) => {

    // Lưu OTP dưới dạng key-value với thời gian hết hạn
    await client.set(`otp:${email}`, otp, {
        EX: expiresAt,
        NX: true,
    });
};

const sendEmail = async (data, otp) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS_EMAIL,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: data.email,
        subject: "Website TOYMODEL gửi mã xác thực",
        text: `Mã xác thực của bạn là: ${otp}`
    }

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log('err send OTP', error);
    }
};

const sendOTP = async (data, type) => {
    try {
        let checkPhone;
        let checkEmail;
        if (type === 'user') {
            checkEmail = await checkEmailUser(data.email);
            checkPhone = await checkUserPhone(data.phone);
        } else if (type === 'staff') {
            checkEmail = await checkEmailStaff(data.email);
            checkPhone = await checkStaffPhone(data.phone);
        }
        if (checkEmail) {
            return {
                status: 0,
                mess: checkEmail,
            };
        }
        if (checkPhone) {
            return {
                status: 0,
                mess: checkPhone,
            };
        }

        const otp = generateOTP();
        const otpExpiry = Date.now() + 60 * 1000;

        const getOldOTP = await getStoredOtp(data.email);
        if (getOldOTP) {
            await deleteStoredOtp(data.email);
        }

        await saveOtp(data.email, otp, otpExpiry);

        await sendEmail(data, otp);
        return {
            status: 0,
            mess: 'Mã OTP đã được gửi đến email của bạn!!!',
        };
    } catch (error) {
        console.log(error);
        return {
            status: -1,
            mess: 'Error sending OTP',
        }
    }
};

export const getStoredOtp = async (email) => {
    const otp = await client.get(`otp:${email}`);
    if (!otp) return null;
    // Giả sử bạn lưu thêm thời gian hết hạn nếu cần
    // Trong ví dụ này, Redis đã tự động hết hạn OTP
    return { otp, expiresAt: Date.now() + 300000 }; // Ví dụ về thời gian hết hạn
};

export const deleteStoredOtp = async (email) => {
    await client.del(`otp:${email}`);
};

const salt = bcrypt.genSaltSync(10);

const funHashPassWord = (password) => {
    let hash = bcrypt.hashSync(password, salt);
    return hash
}

const forgotPass = async (email) => {
    try {
        const user = await db.Staff.findOne({
            where: { email: email }
        })

        if (user) {
            let newPass = randomstring.generate({ length: 8 });

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASS_EMAIL,
                },
            });

            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: "Website TOYMODEL gửi bạn mật khẩu mới",
                text: `Mật khẩu mới của bạn là: ${newPass}`
            }
            await transporter.sendMail(mailOptions);

            let hashNewPass = await funHashPassWord(newPass);

            await user.update({
                password: hashNewPass
            })

            return {
                status: 0,
                mess: 'Cập nhật mật khẩu thành công'
            }
        }
        return {
            status: 0,
            mess: 'Tài khoản không tồn tại'
        }
    } catch (error) {
        console.log(error);
        return {
            status: -1,
            mess: error.message,
        }
    }
};

module.exports = {
    sendOTP,
    forgotPass,
}