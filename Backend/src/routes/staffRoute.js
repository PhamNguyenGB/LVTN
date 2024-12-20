import express from 'express';
import StaffController from '../controllers/staffController';
import SendOTPController from '../controllers/sendOTPController';
import { verifyToken, checkVerifyTokenAdmin, checkVerifyTokenAd } from '../middleware/AuthStaff';
import upload from '../middleware/upLoadFile';

const router = express.Router();

const StaffRoute = (app) => {
    router.post('/sendOTP', SendOTPController.sendOTPCL);
    router.post('/forgot/pass', SendOTPController.forgotPassword);
    router.post('/register', checkVerifyTokenAd, StaffController.reristerStaff);
    router.post('/login', StaffController.login);
    router.post('/refresh', StaffController.refreshToken);
    router.post('/avatar', checkVerifyTokenAdmin, upload.single('image'), StaffController.updateAvatar);
    router.post('/info', checkVerifyTokenAdmin, StaffController.updateInfoStaff);
    router.post('/chance/pass', checkVerifyTokenAdmin, StaffController.chancePassword);
    router.get('/all/staff', checkVerifyTokenAd, StaffController.getAllStaffs);
    router.post('/delete/role', checkVerifyTokenAd, StaffController.deleteRole);
    router.post('/reset/role', checkVerifyTokenAd, StaffController.resetRole);

    return app.use("/api/staff", router);
}

export default StaffRoute;