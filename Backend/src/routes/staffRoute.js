import express from 'express';
import StaffController from '../controllers/staffController';
import SendOTPController from '../controllers/sendOTPController';
import { verifyToken, checkVerifyTokenAdmin } from '../middleware/AuthStaff';
import upload from '../middleware/upLoadFile';

const router = express.Router();

const StaffRoute = (app) => {
    router.post('/sendOTP', SendOTPController.sendOTPCL);
    router.post('/register', StaffController.reristerStaff);
    router.post('/login', StaffController.login);
    router.post('/refresh', StaffController.refreshToken);
    router.post('/avatar', checkVerifyTokenAdmin, upload.single('image'), StaffController.updateAvatar);
    router.post('/info', checkVerifyTokenAdmin, StaffController.updateInfoStaff);

    return app.use("/api/staff", router);
}

export default StaffRoute;