import express from 'express';
import OrderController from '../controllers/orderController';
import { checkVerifyTokenUser, checkVerifyTokenAdmin } from '../middleware/AuthStaff';

const router = express.Router();

const OrderRoute = (app) => {
    router.get('/staff', checkVerifyTokenAdmin, OrderController.getAllOrdersStaff);
    // router.post('/addOrder', OrderController.addCart);
    router.put('/updateStatus', checkVerifyTokenAdmin, OrderController.updateStautsOrder);
    // router.get('/getOrderById', checkVerifyTokenUser, OrderController.getOrderById);
    // router.post('/statisticsMonth', checkVerifyTokenAdmin, OrderController.statisticMoneyMonth);
    // router.post('/statisticsYear', checkVerifyTokenAdmin, OrderController.statisticMoneyYear);
    // router.post('/getData/moneyMonth', OrderController.getDataStatisticMoneyMonth);
    // router.post('/getData/moneyYear', OrderController.getDataStatisticMoneyYear);


    return app.use('/api/order', router);
};

export default OrderRoute;