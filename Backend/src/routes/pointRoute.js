import express from 'express';
import { checkVerifyTokenAdmin, checkVerifyTokenUser } from '../middleware/AuthStaff';
import PointController from '../controllers/pointController';

const router = express.Router();

const PointRoute = (app) => {
    router.get('/', checkVerifyTokenAdmin, PointController.getAllPoint);
    router.post('/create', checkVerifyTokenAdmin, PointController.createPoint);
    router.put('/update', checkVerifyTokenAdmin, PointController.updatePoint);
    router.delete('/delete/:id', checkVerifyTokenAdmin, PointController.deletePoint);
    router.get('/redemption/:currency', checkVerifyTokenUser, PointController.pointsRedemption);

    return app.use('/api/point', router);
};

export default PointRoute;