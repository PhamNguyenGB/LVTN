import express from 'express';
import { checkVerifyTokenAdmin, checkVerifyTokenUser } from '../middleware/AuthStaff';
import { payOnline, callBack, UpdateOrderStatus, VNPayOnline, callbackVNPay } from '../controllers/payOnlineController';


const router = express.Router();

const PaymentOnlineRoute = (app) => {
    router.post('/zaloPay', checkVerifyTokenUser, payOnline);
    router.post('/zaloPay/update/status', UpdateOrderStatus);
    router.post('/zaloPay/callback', callBack);
    router.post('/create_payment_url', VNPayOnline);
    router.get('/vnpay_ipn', callbackVNPay);

    return app.use('/api/payment/online', router);
};

export default PaymentOnlineRoute;