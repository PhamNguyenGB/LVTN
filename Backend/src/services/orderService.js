import db, { sequelize } from '../models/index';
import { Op, fn, col, or } from 'sequelize';

const addOrderService = async (data, user) => {
    const timestamp = Date.now(); // Lấy timestamp hiện tại
    const random = Math.floor(Math.random() * 100000); // Tạo một số ngẫu nhiên

    console.log('check data', data.payOnlineCode);

    try {
        await db.Order.create({
            address: data.address,
            phone: data.phone,
            userId: user.id,
            totalCost: data.totalAmout,
            regionId: data.regionId,
            point: data.point,
            paymentMethod: data.paymentMethod,
            eventId: data?.eventId,
            note: data.note,
            status: 'Chưa xác nhận',
            orderCode: `${timestamp}${random}`,
            payOnlineCode: data.payOnlineCode,
        })

        if (data?.eventId !== null) {
            await db.Used_Event.create({
                userId: user.id,
                eventId: data?.eventId,
            })
        }
        return {
            mess: 'Đặt hàng thành công',
            status: 0,
        }
    } catch (error) {
        console.log(error);
        return {
            mess: 'error add cart',
            status: 1,
        };
    }
}

const getAllOrdersStaffService = async () => {
    try {
        let data = await db.Order.findAll({
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
                {
                    model: db.Staff,
                    attributes: ['email'],
                },
                {
                    model: db.Shipper,
                    attributes: ['email'],
                },
            ]
        });
        return {
            mess: 'Lấy tất cả đơn hàng thành công',
            status: 0,
            data: data,
        }
    } catch (error) {
        return {
            mess: 'Get all orders failed',
            status: -1,
        }
    }
}

const updateStatusOrderServie = async (idOrder, status) => {
    try {
        let order = await db.Order.findOne({
            where: { id: idOrder },
        });
        if (order) {
            await order.update({
                status: status,
            });
        }
        return {
            mess: 'Cập nhật trạng thái đơn hàng thành công',
            status: 0,
        }
    } catch (error) {
        console.log(error);
        return {
            mess: 'Update order status failed',
            status: -1,
        }
    }
}

const findOrderById = async (idUser) => {
    try {
        let order = await db.Order.findAll({
            where: { userId: idUser, }
        });
        return {
            mess: 'Tìm kiếm đơn của người dùng thành công',
            status: 0,
            data: order,
        }
    } catch (error) {
        console.log(error);
        return {
            mess: 'find order by id failed',
            status: -1,
        }
    }
}

const statisticMoneyMonth = async (month) => {
    try {
        const currentYear = new Date().getFullYear();
        let data = await db.Order.findAll({
            where: {
                status: {
                    [Op.notIn]: [
                        'Đã hủy đơn',
                        'Chưa xác nhận'
                    ]
                },
                createdAt: {
                    [Op.and]: [
                        sequelize.literal(`MONTH(createdAt) = ${month}`),
                        sequelize.literal(`YEAR(createdAt) = ${currentYear}`)
                    ]
                }
            }
        });
        return {
            Mess: 'statistics money month',
            ErrC: 0,
            Data: data,
        }
    } catch (error) {
        console.log(error);
        return {
            Mess: 'statistic money month failed',
            ErrC: 1,
            Data: '',
        }
    }
};

const statisticMoneyYear = async (year) => {
    try {
        let data = await db.Order.findAll({
            where: {
                status: {
                    [Op.notIn]: [
                        'Đã hủy đơn',
                        'Chưa xác nhận'
                    ]
                },
                createdAt: {
                    [Op.and]: [
                        sequelize.literal(`YEAR(createdAt) = ${year}`)
                    ]
                }
            }
        });
        return {
            Mess: 'statistics money year',
            ErrC: 0,
            Data: data,
        }
    } catch (error) {
        console.log(error);
        return {
            Mess: 'statistic money year failed',
            ErrC: 1,
            Data: '',
        }
    }
};

const getDataStatisticMoneyMonth = async (month) => {
    try {
        const currentYear = new Date().getFullYear();
        let data = await db.Order.findAll({
            where: {
                status: {
                    [Op.in]: [
                        'Đã xác nhận'
                    ]
                },
                createdAt: {
                    [Op.and]: [
                        sequelize.literal(`MONTH(\`Order\`.\`createdAt\`) = ${month}`),
                        sequelize.literal(`YEAR(\`Order\`.\`createdAt\`) = ${currentYear}`)
                    ]
                }
            },
            include: { model: db.User, attributes: ['username'] }
        })
        return data;
    } catch (error) {
        console.log(error);
        return 'error get data statistic money month';
    }
};

const getDataStatisticMoneyYear = async (year) => {
    try {
        let data = await db.Order.findAll({
            where: {
                status: {
                    [Op.in]: [
                        'Đã xác nhận'
                    ]
                },
                createdAt: {
                    [Op.and]: [
                        sequelize.literal(`YEAR(\`Order\`.\`createdAt\`) = ${year}`)
                    ]
                }
            },
            include: { model: db.User, attributes: ['username'] }
        })
        return data;
    } catch (error) {
        console.log(error);
        return 'error get data statistic money year';
    }
};


module.exports = {
    addOrderService,
    getAllOrdersStaffService,
    updateStatusOrderServie,
    statisticMoneyMonth,
    findOrderById,
    statisticMoneyYear,
    getDataStatisticMoneyMonth,
    getDataStatisticMoneyYear,
}