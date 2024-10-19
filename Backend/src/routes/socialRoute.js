import express from 'express';
import passport from 'passport';
import socialController from '../controllers/socialController';

const router = express.Router();

const SocialRoute = (app) => {
    router.post('/auth/google', socialController.handleLoginGoogle);

    router.post('/auth/google/login', socialController.loginGoogle);


    return app.use('/api/social', router);
};

export default SocialRoute;