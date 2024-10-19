import express from 'express';
import OrderDetailController from '../controllers/orderDetailController';
import { checkVerifyTokenAdmin } from '../middleware/AuthStaff';

const router = express.Router();

const OrderDetailRoute = (app) => {
    router.post('/addOrderDetail', OrderDetailController.addOrderDetail);
    router.get('/getOrderDetail/:id', OrderDetailController.getOrderDetail);
    router.get('/totalQuantity', checkVerifyTokenAdmin, OrderDetailController.totalQuantity);

    return app.use('/api/Details', router);
};

export default OrderDetailRoute;