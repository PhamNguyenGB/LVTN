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

const getAllSoldProducts = async () => {
    try {
        const data = await db.Sold_Product.findAll({
            include: {
                model: db.Product,
                include: { model: db.List_Product }
            },
        });
        return {
            status: 0,
            data: data
        }
    } catch (error) {
        console.log(error);
        return {
            status: -1,
            mess: error.message,
        }
    }
}

module.exports = {
    addSoldProduct,
    getAllSoldProducts
}