import db from '../models/index';

const addOrderDetailService = async (data, user) => {
    try {
        // let yourOrder = await db.Order.findOne({
        //     where: { userId: user.id }
        // });
        // if (yourOrder) {
        let newYourOrder = await db.Order.findOne({
            where: { userId: user.id },
            order: [['createdAt', 'DESC']],
        });
        if (newYourOrder) {
            data.products.map(async (item) => {
                await db.Order_Detail.create({
                    orderId: newYourOrder.id,
                    ProductId: item.id,
                    totalCost: (item.discount && item.discount > 0) ? item.discount : item.price,
                    quantity: item.quantity,
                });
            });
            return {
                mess: 'Added order detail successfully',
                status: 0,
            }
        }
        // }
        return {
            mess: 'error add order detail',
            status: -1,
        };
    } catch (error) {
        console.log(error);
        return {
            mess: 'error add order detail',
            status: -1,
        };
    }
};

const getOrderDetailService = async (idOrder) => {
    try {
        const data = await db.Order_Detail.findAll({
            where: { orderId: idOrder },
            include: [
                {
                    model: db.Product
                },
                {
                    model: db.Order,
                    include: [
                        {
                            model: db.User,
                            attributes: ['email'],
                        },
                        {
                            model: db.Region,
                            attributes: ['name', 'deliveryFee'],
                        },
                        {
                            model: db.Event,
                            attributes: ['discount', 'expiryDate', 'name'],
                        },
                    ]
                }
            ]
        });
        return {
            mess: 'Lây chi tiết đơn hàng thành công',
            status: 0,
            data: data,
        }
    } catch (error) {
        console.log(error);
        return {
            mess: 'Lỗi lấy chi tiết đơn hàng',
            status: -1,
            data: '',
        }
    }
};

const TotalQuantityService = async () => {
    try {
        const data = await db.Order_Detail.findAll({});
        let totalQuantity = 0;
        data.map((item) => {
            totalQuantity += item.quantity;
        });
        return totalQuantity;
    } catch (error) {
        console.log(error);
        return 'error total quantity';
    }
};

module.exports = {
    addOrderDetailService,
    getOrderDetailService,
    TotalQuantityService,
}