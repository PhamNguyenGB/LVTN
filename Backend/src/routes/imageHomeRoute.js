import express from 'express';
import { checkVerifyTokenAdmin, checkVerifyTokenUser } from '../middleware/AuthStaff';
import ImageHomeController from '../controllers/imageHomeController';
import upload from '../middleware/upLoadFile';

const router = express.Router();

const ImgHomeRoute = (app) => {
    router.get('/', ImageHomeController.getAllImageHome);
    router.post('/create', checkVerifyTokenAdmin, upload.single('image'), ImageHomeController.createImageHome);
    router.delete('/delete/:id', checkVerifyTokenAdmin, ImageHomeController.deleteImageHome);

    return app.use('/api/image/home', router);
};

export default ImgHomeRoute;