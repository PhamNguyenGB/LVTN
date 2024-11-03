import express from 'express';
import { checkVerifyTokenAdmin, checkVerifyTokenUser } from '../middleware/AuthStaff';
import CommentReviewController from '../controllers/commentReviewController';

const router = express.Router();

const CommentReviewRoute = (app) => {
    router.get('/:productId/:page/:limit', CommentReviewController.CommentReview);
    router.post('/create', checkVerifyTokenUser, CommentReviewController.addReviewAndComment);
    router.post('/repcomment/create', checkVerifyTokenAdmin, CommentReviewController.addRepComment);
    router.get('/getall', checkVerifyTokenAdmin, CommentReviewController.getAllReview);

    return app.use('/api/comment/review', router);
};

export default CommentReviewRoute;