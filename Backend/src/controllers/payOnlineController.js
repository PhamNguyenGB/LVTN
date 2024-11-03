require("dotenv").config();
const axios = require('axios').default;
const CryptoJS = require('crypto-js');
const moment = require('moment');
const qs = require('qs');
const querystring = require('qs');
const crypto = require("crypto");

import OrderService from '../services/orderService';

const config = {
    app_id: process.env.APP_ID,
    key1: process.env.KEY1,
    key2: process.env.KEY2,
    endpoint: process.env.ENDPOINT
};

const payOnline = async (req, res) => {
    const embed_data = {
        redirecturl: 'http://localhost:3000/'
    };

    // const payOnlineCode = req.body?.payOnlineCode;

    const items = [{}];
    const transID = Math.floor(Math.random() * 1000000);
    const order = {
        app_id: config.app_id,
        app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
        app_user: "website model",
        app_time: Date.now(), // miliseconds
        item: JSON.stringify(items),
        embed_data: JSON.stringify(embed_data),
        amount: req.body.totalAmout,
        description: `Mã giao dịch #${transID}`,
        bank_code: "",
        callback_url: 'https://e751-14-191-78-173.ngrok-free.app/api/payment/online/zaloPay/callback'
    };


    // appid|app_trans_id|appuser|amount|apptime|embeddata|item
    const data = config.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
    order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

    try {
        const result = await axios.post(config.endpoint, null, { params: order });

        return res.status(200).json({
            data: result.data,
            payCode: order.app_trans_id,
        });
    } catch (error) {
        console.log(error);

    }

};

const callBack = async (req, res) => {
    let result = {};

    try {
        let dataStr = req.body.data;
        let reqMac = req.body.mac;

        let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();

        // kiểm tra callback hợp lệ (đến từ ZaloPay server)
        if (reqMac !== mac) {
            // callback không hợp lệ
            result.return_code = -1;
            result.return_message = "mac not equal";
        }
        else {
            // thanh toán thành công
            // merchant cập nhật trạng thái cho đơn hàng
            let dataJson = JSON.parse(dataStr, config.key2);
            // console.log("update order's status = success where app_trans_id =", dataJson["app_trans_id"]);
            await OrderService.updateStatusPay(dataJson["app_trans_id"]);
            result.return_code = 1;
            result.return_message = "success";

        }
    } catch (ex) {
        result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
        result.return_message = ex.message;
    }

    // thông báo kết quả cho ZaloPay server
    res.json(result);
};

const UpdateOrderStatus = async (req, res) => {
    const app_trans_id = req.body.app_trans_id;

    let postData = {
        app_id: config.app_id,
        app_trans_id: app_trans_id, // Input your app_trans_id
    }

    let data = postData.app_id + "|" + postData.app_trans_id + "|" + config.key1; // appid|app_trans_id|key1
    postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();


    let postConfig = {
        method: 'post',
        url: process.env.ENDPOINT_STATUS,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(postData)
    };

    try {
        const result = await axios(postConfig);
        return res.status(200).json(result.data);
    } catch (error) {
        console.log(error);

    }
};

const VNPayOnline = (req, res) => {
    const ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    // const config = require('config');
    // const dateFormat = require('dateformat');


    const tmnCode = 'U21ZAOO1';
    const secretKey = '36J5UK5VEZENECTTARLM8O50RPKC89UW';
    let vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
    const returnUrl = 'http://localhost:3000/return/vnpay';

    const date = new Date();

    const createDate = moment(date).format('YYYYMMDDHHmmss');
    const orderId = moment(date).format('HHmmss');
    let amount = req.body.amount;
    let bankCode = req.body.bankCode || null;

    console.log('check amount: ' + amount);
    console.log('check bankCode: ' + bankCode);


    let orderInfo = req.body.orderDescription;
    let orderType = req.body.orderType;
    // let locale = req.body.language;
    // if (locale === null || locale === '') {
    //     locale = 'vn';
    // }
    const currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = 'vn';
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = orderType;
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if (bankCode !== null && bankCode !== '') {
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    let signData = querystring.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    // res.redirect(vnpUrl);

    return res.status(200).json({ vnpUrl, orderId });
    // Vui lòng tham khảo thêm tại code demo

};

const callbackVNPay = async (req, res) => {
    let vnp_Params = req.query;
    const secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);
    let secretKey = '36J5UK5VEZENECTTARLM8O50RPKC89UW';
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

    if (secureHash === signed) {
        let orderId = vnp_Params['vnp_TxnRef'];
        let rspCode = vnp_Params['vnp_ResponseCode'];

        await OrderService.updateStatusPay(orderId);

        //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
        return res.status(200).json({ RspCode: rspCode, Message: 'success', orderId })
    }
    else {
        return res.status(200).json({ RspCode: '97', Message: 'Fail checksum' })
    }
}

// Hàm sắp xếp các tham số
const sortObject = (obj) => {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}
// Vui lòng tham khảo thêm tại code demo

const formatDateVNPay = () => {
    const ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    const config = require('config');
    const dateFormat = require('dateformat');


    const tmnCode = config.get('vnp_TmnCode');
    const secretKey = config.get('vnp_HashSecret');
    const vnpUrl = config.get('vnp_Url');
    const returnUrl = config.get('vnp_ReturnUrl');

    const date = new Date();

    const createDate = dateFormat(date, 'yyyymmddHHmmss');
    const orderId = dateFormat(date, 'HHmmss');
    const amount = req.body.amount;
    const bankCode = req.body.bankCode;

    const orderInfo = req.body.orderDescription;
    const orderType = req.body.orderType;
    const locale = req.body.language;
    if (locale === null || locale === '') {
        locale = 'vn';
    }
    const currCode = 'VND';
    const vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = orderType;
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if (bankCode !== null && bankCode !== '') {
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    const querystring = require('qs');
    const signData = querystring.stringify(vnp_Params, { encode: false });
    const crypto = require("crypto");
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    res.redirect(vnpUrl)
};

module.exports = {
    payOnline,
    callBack,
    UpdateOrderStatus,
    VNPayOnline,
    callbackVNPay,
}