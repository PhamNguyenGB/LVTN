import db from '../models/index';

const GetAllReviewById = async (idProduct, page, limit) => {
    try {
        let offset = (page - 1) * limit;
        const { count, rows } = await db.Review.findAndCountAll({
            offset: offset,
            limit: limit,
            where: { productId: idProduct },
            attributes: ['productId', 'star'],
            include: [
                {
                    model: db.User,
                    attributes: ['fullname', 'avatar'],
                },
                {
                    model: db.Comment,
                    attributes: ['content'],
                },
                {
                    model: db.Rep_Comment,
                    attributes: ['note'],
                }
            ]
        });

        let totalPages = Math.ceil(count / limit);

        let data = {
            totalRows: count,
            totalPages: totalPages,
            review: rows,
        }

        return {
            status: 0,
            data: data,
            mess: 'Tìm thấy review'
        };
    } catch (error) {
        console.log(error);
        return error.message;
    }
};

module.exports = {
    GetAllReviewById,
}