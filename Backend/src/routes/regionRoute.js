import express from 'express';
import { checkVerifyTokenAdmin } from '../middleware/AuthStaff';
import RegionController from '../controllers/regionController';

const router = express.Router();

const RegionRoute = (app) => {
    router.get('/', checkVerifyTokenAdmin, RegionController.getAllRegion);
    router.post('/create', checkVerifyTokenAdmin, RegionController.createRegion);
    router.put('/update', checkVerifyTokenAdmin, RegionController.updateRegion);
    router.delete('/delete/:id', checkVerifyTokenAdmin, RegionController.deleteRegion);

    return app.use('/api/region', router);
};

export default RegionRoute;
