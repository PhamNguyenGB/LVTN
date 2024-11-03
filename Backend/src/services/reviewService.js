import db from '../models/index';

const addReviewAndComment = async (data, user) => {
    try {
        const comment = await db.Comment.create({
            userId: user.id,
            productId: data.productId,
            content: data.content,
        })

        await db.Review.create({
            productId: data.productId,
            userId: user.id,
            star: data.star,
            commentId: comment.id,
        });

        const reviewOfProduct = await db.Review.findAll({
            where: { productId: data.productId }
        });

        let star = 0;
        let total = 0;
        reviewOfProduct.forEach((review) => {
            star += review.star;
            total++;
        });

        const product = await db.Product.findOne({
            where: { id: data.productId }
        });

        product.update({
            star: (star / total),
        })

        const OrD = await db.Order_Detail.findOne({
            where: { id: data.OrDId }
        })

        OrD.update({
            evaluated: true,
        })

        return {
            status: 0,
            mess: 'Đánh giá thành công'
        }
    } catch (error) {
        console.log(error);
        return {
            status: -1,
            mess: 'Đánh giá thất bại'
        }

    }
}

const addRepComment = async (data, staff) => {
    try {
        const review = await db.Review.findOne({
            where: { id: data.reviewId }
        });

        if (review) {
            const repComment = await db.Rep_Comment.create({
                staffId: staff.id,
                note: data.note
            });

            await review.update({
                repCommentId: repComment.id,
            })
        }
        return {
            status: 0,
            mess: 'Trả lời đánh giá thành công'
        }
    } catch (error) {
        console.log(error);
        return {
            status: -1,
            mess: 'Trả lời đánh giá thất bại'
        }
    }
}

const getAllReview = async () => {
    try {
        const data = await db.Review.findAll({
            include: [
                {
                    model: db.Comment
                },
                {
                    model: db.Rep_Comment,
                },
                {
                    model: db.Product
                },
                {
                    model: db.User
                }
            ]
        })
        return {
            status: 0,
            mess: 'Lấy tất cả đánh giá thành công',
            data: data
        }
    } catch (error) {
        console.log(error);
        return {
            status: -1,
            mess: 'Lấy tất cả đánh giá thất bại'
        }
    }
}


module.exports = {
    addReviewAndComment,
    addRepComment,
    getAllReview,
}