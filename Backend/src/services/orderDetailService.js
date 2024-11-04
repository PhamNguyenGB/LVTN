import db, { sequelize } from '../models/index';
import { Op, fn, col, or, where } from 'sequelize';

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

const ListCarStatistics = async (year) => {
    try {
        // Mảng chứa tất cả các tháng từ 1 đến 12
        const allMonths = Array.from({ length: 12 }, (_, i) => {
            return { month: (i + 1).toString().padStart(2, '0'), totalListCar: 0 }; // Định dạng tháng là '01', '02', ...
        });

        const car = await db.Order_Detail.findAll({
            include: {
                model: db.Product,
                attributes: ['listProductId'],
                where: {
                    listProductId: [1],
                },
                required: true,
            },
            attributes: [
                [fn('DATE_FORMAT', col('Order_Detail.createdAt'), '%m'), 'month'], // Lấy từng tháng
                'Product.listProductId',
                [fn('SUM', col('Order_Detail.quantity')), 'totalListCar'] // Tổng đơn hàng từng tháng
            ],
            where: {
                '$Order_Detail.createdAt$': {
                    [Op.gte]: new Date(`${year}-01-01`), // Bắt đầu từ đầu năm
                    [Op.lte]: new Date(`${year}-12-31`),  // Kết thúc ở cuối năm
                }
            },
            group: [fn('DATE_FORMAT', col('Order_Detail.createdAt'), '%m')], // Nhóm theo tháng
            order: [[fn('DATE_FORMAT', col('Order_Detail.createdAt'), '%m'), 'ASC']]
        });

        const carMap = car.reduce((acc, item) => {
            const month = parseInt(item.dataValues.month, 10);
            if (!acc[month]) acc[month] = 0;
            acc[month] += parseFloat(item.dataValues.totalListCar) || 0;
            return acc;
        }, {});
        // Kết hợp với mảng allMonths
        allMonths.forEach(month => {
            if (carMap[month.month]) {
                month.totalListCar = carMap[month.month];
            }
        });

        return allMonths;
    } catch (error) {
        console.log(error);
        return;
    }
}

const ListSpecializedVehicleStatistics = async (year) => {
    try {
        // Mảng chứa tất cả các tháng từ 1 đến 12
        const allMonths = Array.from({ length: 12 }, (_, i) => {
            return { month: (i + 1).toString().padStart(2, '0'), totalListCar: 0 };
        });

        const specializedVehicle = await db.Order_Detail.findAll({
            include: {
                model: db.Product,
                attributes: ['listProductId'],
                where: {
                    listProductId: [2],
                },
                required: true,
            },
            attributes: [
                [fn('DATE_FORMAT', col('Order_Detail.createdAt'), '%m'), 'month'],
                'Product.listProductId',
                [fn('SUM', col('Order_Detail.quantity')), 'totalListCar']
            ],
            where: {
                '$Order_Detail.createdAt$': {
                    [Op.gte]: new Date(`${year}-01-01`),
                    [Op.lte]: new Date(`${year}-12-31`),
                }
            },
            group: [fn('DATE_FORMAT', col('Order_Detail.createdAt'), '%m')],
            order: [[fn('DATE_FORMAT', col('Order_Detail.createdAt'), '%m'), 'ASC']]
        });

        const specializedVehicleMap = specializedVehicle.reduce((acc, item) => {
            const month = parseInt(item.dataValues.month, 10);
            if (!acc[month]) acc[month] = 0;
            acc[month] += parseFloat(item.dataValues.totalListCar) || 0;
            return acc;
        }, {});
        // Kết hợp với mảng allMonths
        allMonths.forEach(month => {
            if (specializedVehicleMap[month.month]) {
                month.totalListCar = specializedVehicleMap[month.month];
            }
        });

        return allMonths;
    } catch (error) {
        console.log(error);
        return;
    }
}

const ListPlaneStatistics = async (year) => {
    try {
        // Mảng chứa tất cả các tháng từ 1 đến 12
        const allMonths = Array.from({ length: 12 }, (_, i) => {
            return { month: (i + 1).toString().padStart(2, '0'), totalListCar: 0 };
        });

        const plane = await db.Order_Detail.findAll({
            include: {
                model: db.Product,
                attributes: ['listProductId'],
                where: {
                    listProductId: [3],
                },
                required: true,
            },
            attributes: [
                [fn('DATE_FORMAT', col('Order_Detail.createdAt'), '%m'), 'month'],
                'Product.listProductId',
                [fn('SUM', col('Order_Detail.quantity')), 'totalListCar']
            ],
            where: {
                '$Order_Detail.createdAt$': {
                    [Op.gte]: new Date(`${year}-01-01`),
                    [Op.lte]: new Date(`${year}-12-31`),
                }
            },
            group: [fn('DATE_FORMAT', col('Order_Detail.createdAt'), '%m')],
            order: [[fn('DATE_FORMAT', col('Order_Detail.createdAt'), '%m'), 'ASC']]
        });

        const planeMap = plane.reduce((acc, item) => {
            const month = parseInt(item.dataValues.month, 10);
            if (!acc[month]) acc[month] = 0;
            acc[month] += parseFloat(item.dataValues.totalListCar) || 0;
            return acc;
        }, {});
        // Kết hợp với mảng allMonths
        allMonths.forEach(month => {
            if (planeMap[month.month]) {
                month.totalListCar = planeMap[month.month];
            }
        });

        return allMonths;
    } catch (error) {
        console.log(error);
        return;
    }
}

module.exports = {
    addOrderDetailService,
    getOrderDetailService,
    TotalQuantityService,
    ListCarStatistics,
    ListSpecializedVehicleStatistics,
    ListPlaneStatistics,
}