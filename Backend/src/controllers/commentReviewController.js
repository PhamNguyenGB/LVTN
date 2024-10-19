import CommentReviewService from '../services/commentReviewService';

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

module.exports = {
    CommentReview,
}