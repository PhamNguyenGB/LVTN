import express from 'express';
import UserController from '../controllers/userController';
import { checkVerifyTokenUser, checkVerifyTokenAdmin } from '../middleware/AuthStaff';
import SendOTPController from '../controllers/sendOTPController';

const router = express.Router();

const UserRoute = (app) => {
    router.post('/sendOTP', SendOTPController.sendOTPCL);
    router.post('/register', UserController.register);
    router.post('/login', UserController.loginUser);
    router.post('/auth/google', UserController.verifyGoogleToken);
    router.post('/refresh', UserController.refreshToken);
    router.post('/update/point', checkVerifyTokenUser, UserController.updatePointUser);


    router.get('/statictis/users', checkVerifyTokenAdmin, UserController.statisticUsers);
    router.get('/statictis/getAllUsers', checkVerifyTokenAdmin, UserController.getAllUsers);

    return app.use('/api/user', router);
};

export default UserRoute;