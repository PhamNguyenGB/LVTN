require("dotenv").config();
const axios = require('axios').default;
const CryptoJS = require('crypto-js');
const moment = require('moment');
const qs = require('qs');

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
        callback_url: 'https://bf67-14-191-78-173.ngrok-free.app/api/user/callback'
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

const callBack = (req, res) => {
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
            console.log("update order's status = success where app_trans_id =", dataJson["app_trans_id"]);

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

module.exports = {
    payOnline,
    callBack,
    UpdateOrderStatus,
}