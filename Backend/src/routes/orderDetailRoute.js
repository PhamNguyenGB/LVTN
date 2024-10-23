import express from 'express';
import OrderDetailController from '../controllers/orderDetailController';
import { checkVerifyTokenAdmin, checkVerifyTokenUser } from '../middleware/AuthStaff';

const router = express.Router();

const OrderDetailRoute = (app) => {
    router.post('/addOrderDetail', checkVerifyTokenUser, OrderDetailController.addOrderDetail);
    router.get('/getOrderDetail/:id', checkVerifyTokenUser, OrderDetailController.getOrderDetail);
    router.get('/totalQuantity', checkVerifyTokenAdmin, OrderDetailController.totalQuantity);

    return app.use('/api/Details', router);
};

export default OrderDetailRoute;