import express from 'express';
import OrderController from '../controllers/orderController';
import { checkVerifyTokenUser, checkVerifyTokenAdmin, checkVerifyTokenShipper } from '../middleware/AuthStaff';

const router = express.Router();

const OrderRoute = (app) => {
    router.get('/staff', checkVerifyTokenAdmin, OrderController.getAllOrdersStaff);
    router.post('/addOrder', checkVerifyTokenUser, OrderController.addCart);
    router.put('/staff/update/status', checkVerifyTokenAdmin, OrderController.updateStautsOrderStaff);
    router.get('/getOrderById', checkVerifyTokenUser, OrderController.getOrderById);

    //statistic
    router.get('/revenue/report/month/:year', checkVerifyTokenAdmin, OrderController.monthlyRevenueReport);
    router.get('/statistic/order/month/:year', checkVerifyTokenAdmin, OrderController.orderStatistics);
    router.get('/statistic/order/status', checkVerifyTokenAdmin, OrderController.getOrderStatusStatistics);
    router.get('/statistic/order/user', checkVerifyTokenAdmin, OrderController.statisticUser);

    // router.post('/statisticsMonth', checkVerifyTokenAdmin, OrderController.statisticMoneyMonth);
    // router.post('/statisticsYear', checkVerifyTokenAdmin, OrderController.statisticMoneyYear);
    // router.post('/getData/moneyMonth', OrderController.getDataStatisticMoneyMonth);
    // router.post('/getData/moneyYear', OrderController.getDataStatisticMoneyYear);

    //Shipper
    router.get('/storage', checkVerifyTokenShipper, OrderController.getOrderInStorage);
    router.get('/transit', checkVerifyTokenShipper, OrderController.getOrderInTransit);
    router.post('/shipper/update/status', checkVerifyTokenShipper, OrderController.updateStatusShipper);
    router.get('/transited', checkVerifyTokenShipper, OrderController.getAllOrderTransited);

    return app.use('/api/order', router);
};

export default OrderRoute;