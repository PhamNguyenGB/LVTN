import express from 'express';
import { checkVerifyTokenAdmin } from '../middleware/AuthStaff';
import CommentReviewController from '../controllers/commentReviewController';

const router = express.Router();

const CommentReviewRoute = (app) => {
    router.get('/:productId/:page/:limit', CommentReviewController.CommentReview);


    return app.use('/api/comment/review', router);
};

export default CommentReviewRoute;