import express from 'express';
import { checkVerifyTokenAdmin, checkVerifyTokenUser } from '../middleware/AuthStaff';
import SoldProductController from '../controllers/soldProductController';

const router = express.Router();

const SoldProductRoute = (app) => {
    router.post('/create', checkVerifyTokenAdmin, SoldProductController.addSoldProduct);
    router.get('/getAll', checkVerifyTokenAdmin, SoldProductController.getAllSoldProducts);

    return app.use('/api/sold/product', router);
};

export default SoldProductRoute;