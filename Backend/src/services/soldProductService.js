import db, { sequelize } from '../models/index';

const addSoldProduct = async (data) => {
    try {
        data.forEach(async (item) => {
            await db.Sold_Product.create({
                productId: item.productId,
                quantity: item.quantity,
            });
        })
        return {
            status: 0,
        }
    } catch (error) {
        console.log(error);
        return {
            status: -1
        }
    }
}

module.exports = {
    addSoldProduct,
}