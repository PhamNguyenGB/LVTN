import express from 'express';
import { checkVerifyTokenAdmin } from '../middleware/AuthStaff';
import ListProductController from '../controllers/listProductController';

const router = express.Router();

const ListProductRoute = (app) => {
    router.get('/', ListProductController.getAllListProduct);
    router.post('/create', checkVerifyTokenAdmin, ListProductController.createListProduct);
    router.put('/update', checkVerifyTokenAdmin, ListProductController.updateListProduct);
    router.delete('/delete/:id', checkVerifyTokenAdmin, ListProductController.deleteListProduct);

    return app.use('/api/listProduct', router);
};

export default ListProductRoute;