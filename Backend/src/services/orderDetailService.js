import db from '../models/index';

const addOrderDetailService = async (data) => {
    try {
        let yourOrder = await db.Order.findOne({
            where: { userId: data.userId }
        });
        if (yourOrder) {
            let newYourOrder = await db.Order.findOne({
                where: { userId: yourOrder.dataValues.userId },
                order: [['createdAt', 'DESC']],
            });
            if (newYourOrder) {
                data.products.map(async (item) => {
                    await db.Order_Detail.create({
                        orderId: newYourOrder.id,
                        ProductId: item.id,
                        price: item.price,
                        quantity: item.quantity,
                    });
                });
                return {
                    Mess: 'Added order detail successfully',
                    ErrC: 0,
                    Data: '',
                }
            }
        }
        return {
            Mess: 'error add order detail',
            ErrC: 1,
            Data: '',
        };
    } catch (error) {
        console.log(error);
        return {
            Mess: 'error add order detail',
            ErrC: -1,
            Data: '',
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