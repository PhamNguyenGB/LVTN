import express from 'express';
import ShipperController from '../controllers/shipperController';
// import SendOTPController from '../controllers/sendOTPController';
import { checkVerifyTokenShipper } from '../middleware/AuthStaff';
import upload from '../middleware/upLoadFile';

const router = express.Router();

const ShipperRoute = (app) => {
    // router.post('/sendOTP', SendOTPController.sendOTPCL);
    router.post('/register', ShipperController.registerShipper);
    router.post('/login', ShipperController.login);
    router.post('/refresh', ShipperController.refreshToken);
    router.post('/avatar', checkVerifyTokenShipper, upload.single('image'), ShipperController.updateAvatar);
    router.post('/info', checkVerifyTokenShipper, ShipperController.updateInfoStaff);

    return app.use("/api/shipper", router);
}

export default ShipperRoute;