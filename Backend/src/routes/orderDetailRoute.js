import express from 'express';
import OrderDetailController from '../controllers/orderDetailController';
import { checkVerifyTokenAdmin, checkVerifyTokenUser } from '../middleware/AuthStaff';

const router = express.Router();

const OrderDetailRoute = (app) => {
    router.post('/addOrderDetail', checkVerifyTokenUser, OrderDetailController.addOrderDetail);
    router.get('/staff/orderDetail/:id', checkVerifyTokenAdmin, OrderDetailController.getOrderDetail);
    router.get('/user/orderDetail/:id', checkVerifyTokenUser, OrderDetailController.getOrderDetail);
    router.get('/totalQuantity', checkVerifyTokenAdmin, OrderDetailController.totalQuantity);
    router.get('/statistic/list/product/car/month/:year', checkVerifyTokenAdmin, OrderDetailController.ListCarStatistics);
    router.get('/statistic/list/product/specialized/vehicle/month/:year', checkVerifyTokenAdmin, OrderDetailController.ListSpecializedVehicleStatistics);
    router.get('/statistic/list/product/plane/month/:year', checkVerifyTokenAdmin, OrderDetailController.ListPlaneStatistics);
    router.get('/statistic/list/product/motor/month/:year', checkVerifyTokenAdmin, OrderDetailController.ListMotorStatistics);
    router.get('/sold/products', checkVerifyTokenAdmin, OrderDetailController.countSoldProducts);
    router.get('/top/selling/products', OrderDetailController.topSellingProducts);

    return app.use('/api/Details', router);
};

export default OrderDetailRoute;