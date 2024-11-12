import express from 'express';
import { checkVerifyTokenAdmin, checkVerifyTokenUser } from '../middleware/AuthStaff';
import EventController from '../controllers/eventController';
import LevelController from '../controllers/levelController';

const router = express.Router();

const LevelRoute = (app) => {
    router.get('/', checkVerifyTokenAdmin, LevelController.getAllLevels);
    router.post('/create', checkVerifyTokenAdmin, LevelController.createLevel);
    router.put('/update', checkVerifyTokenAdmin, LevelController.updateLevel);
    router.delete('/delete/:id', checkVerifyTokenAdmin, LevelController.deleteLevel);

    return app.use('/api/level', router);
};

export default LevelRoute;