import CommentReviewService from '../services/commentReviewService';
import ReviewSevice from '../services/reviewService';

const CommentReview = async (req, res) => {
    try {
        let page = req.params.page;
        let limit = req.params.limit;
        const data = await CommentReviewService.GetAllReviewById(req.params.productId, +page, +limit);
        if (data.status === 0)
            return res.status(200).json({
                status: 0,
                data: data,
                mess: data.mess
            });
        return res.status(500).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Lỗi tìm comment');
    }
};

const addReviewAndComment = async (req, res) => {
    try {
        const data = await ReviewSevice.addReviewAndComment(req.body, req.user);
        if (data.status === 0) {
            return res.status(200).json({
                status: 0,
                data: data.data,
                mess: data.ness
            });
        }
        return res.status(500).json({
            status: -1,
            mess: data.ness
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: -1,
            mess: 'Error adding review'
        });
    }
};

const addRepComment = async (req, res) => {
    try {
        const data = await ReviewSevice.addRepComment(req.body, req.user);
        if (data.status === 0) {
            return res.status(200).json({
                status: 0,
                mess: data.mess,
            });
        }
        return res.status(500).json({
            status: -1,
            mess: data.mess,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: -1,
            mess: 'Error adding rep comment',
        });
    }
};

const getAllReview = async (req, res) => {
    try {
        const data = await ReviewSevice.getAllReview();
        if (data.status === 0) {
            return res.status(200).json({
                status: 0,
                data: data.data,
                mess: data.mess
            });
        }
        return res.status(500).json({
            status: 0,
            mess: data.mess
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 0,
            mess: 'error get all review'
        });
    }
};

module.exports = {
    CommentReview,
    addReviewAndComment,
    addRepComment,
    getAllReview,
}