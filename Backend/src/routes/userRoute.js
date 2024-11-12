import express from 'express';
import UserController from '../controllers/userController';
import { checkVerifyTokenUser, checkVerifyTokenAdmin } from '../middleware/AuthStaff';
import SendOTPController from '../controllers/sendOTPController';
import upload from '../middleware/upLoadFile';

const router = express.Router();

const UserRoute = (app) => {
    router.post('/sendOTP', SendOTPController.sendOTPCL);
    router.post('/register', UserController.register);
    router.post('/login', UserController.loginUser);
    router.post('/auth/google', UserController.verifyGoogleToken);
    router.post('/refresh', UserController.refreshToken);
    router.post('/decreate/point', checkVerifyTokenUser, UserController.decreasePointUser);
    router.post('/avatar', checkVerifyTokenUser, upload.single('image'), UserController.updateAvatar);
    router.post('/update/info', checkVerifyTokenUser, UserController.updateInfoUser);
    router.get('/get/info', checkVerifyTokenUser, UserController.getInfoById);
    router.post('/update/point', checkVerifyTokenAdmin, UserController.increatePointUser);
    router.post('/update/level', checkVerifyTokenAdmin, UserController.UpdateLevel);

    router.get('/statictis/users', checkVerifyTokenAdmin, UserController.statisticUsers);
    router.get('/getAllUsers', checkVerifyTokenAdmin, UserController.getAllUsers);

    return app.use('/api/user', router);
};

export default UserRoute;