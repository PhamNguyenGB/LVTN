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
            include: { model: db.Product }
        });
        return {
            Mess: 'Get all idOrder detail successfully',
            ErrC: 0,
            Data: data,
        }
    } catch (error) {
        console.log(error);
        return {
            Mess: 'error get all idOrder detail',
            ErrC: 1,
            Data: '',
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