import express from 'express';
import { checkVerifyTokenAdmin, checkVerifyTokenUser } from '../middleware/AuthStaff';
import { payOnline, callBack, UpdateOrderStatus } from '../controllers/payOnlineController';


const router = express.Router();

const PaymentOnlineRoute = (app) => {
    router.post('/zaloPay', checkVerifyTokenUser, payOnline);
    router.post('/zaloPay/update/status', UpdateOrderStatus);
    router.post('/zaloPay/callback', callBack);

    return app.use('/api/payment/online', router);
};

export default PaymentOnlineRoute;