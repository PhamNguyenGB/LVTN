import { where } from 'sequelize';
import OrderService from '../services/orderService';

const addCart = async (req, res) => {
    try {
        let data = await OrderService.addOrderService(req.body, req.user);
        return res.status(200).json({
            mess: data.mess,
            status: data.status,
            data: data.data,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Mess: 'Error adding order',
            ErrC: -1,
            Data: '',
        });
    }
};

const getAllOrdersStaff = async (req, res) => {
    try {
        let data = await OrderService.getAllOrdersStaffService();
        if (data.status === 0)
            return res.status(200).json({
                mess: data.Mess,
                status: 0,
                data: data.data,
            });
        return res.status(500).json({
            mess: data.Mess,
            status: -1,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mess: 'Error getting all orders',
            status: -1,
        });
    }
};

const updateStautsOrderStaff = async (req, res) => {
    try {
        let data = await OrderService.updateStatusOrderStaff(req.body.orderId, req.body.status, req.user);
        if (data.status === 0)
            return res.status(200).json({
                mess: data.mess,
                status: 0,
            });
        return res.status(500).json({
            mess: data.mess,
            status: -1,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mess: 'Error updating statuts order',
            status: -1,
        });
    }
};

const getOrderById = async (req, res) => {
    try {
        let data = await OrderService.findOrderById(req.user);
        if (data.status === 0)
            return res.status(200).json({
                mess: data.mess,
                status: 0,
                data: data.data,
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mess: 'Error get order by id',
            status: -1,
        });
    }
};

const statisticMoneyMonth = async (req, res) => {
    try {
        let data = await OrderService.statisticMoneyMonth(req.body.month);
        let totalCost = 0;
        data.Data.map((item) => {
            totalCost += item.totalCost;
        });
        return res.status(200).json({
            Mess: data.Mess,
            ErrC: data.ErrC,
            Data: totalCost,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Mess: 'Error statistic money month',
            ErrC: -1,
            Data: '',
        });
    }
};

const statisticMoneyYear = async (req, res) => {
    try {
        let data = await OrderService.statisticMoneyYear(req.body.year);
        let totalCost = 0;
        data.Data.map((item) => {
            totalCost += item.totalCost;
        });
        return res.status(200).json({
            Mess: data.Mess,
            ErrC: data.ErrC,
            Data: totalCost,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Mess: 'Error statistic money year',
            ErrC: -1,
            Data: '',
        });
    }
};

const getDataStatisticMoneyMonth = async (req, res) => {
    try {
        let data = await OrderService.getDataStatisticMoneyMonth(req.body.month);
        return res.status(200).json({ data });
    } catch (error) {
        console.log(error);
        return res.status(500).json('error get data statistic money month');
    }
};

const getDataStatisticMoneyYear = async (req, res) => {
    try {
        let data = await OrderService.getDataStatisticMoneyYear(req.body.year);
        return res.status(200).json({ data });
    } catch (error) {
        console.log(error);
        return res.status(500).json('error get data statistic money year');
    }
};


const getOrderInStorage = async (req, res) => {
    try {
        let data = await OrderService.getOrderInStorage();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({
            status: -1,
            mess: 'error get order in storage'
        });
    }
};

const getOrderInTransit = async (req, res) => {
    try {
        let data = await OrderService.getOrderInTransit(req.user);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({
            status: -1,
            mess: 'error get order in transit'
        });
    }
};

const updateStatusShipper = async (req, res) => {
    try {
        let data = await OrderService.updateStatusShipper(req.body.orderId, req.body.status, req.user);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({
            status: -1,
            mess: 'error get order in update status shipper'
        });
    }
}

const getAllOrderTransited = async (req, res) => {
    try {
        let data = await OrderService.getAllOrderTransited(req.user);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({
            status: -1,
            mess: 'error get order in get transited of shipper'
        });
    }
}

const monthlyRevenueReport = async (req, res) => {
    try {
        let data = await OrderService.monthlyRevenueReport(req.params.year);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        returnres.status(500).json(error.message);
    }
}

const orderStatistics = async (req, res) => {
    try {
        let data = await OrderService.orderStatistics(req.params.year);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message);
    }
}

const getOrderStatusStatistics = async (req, res) => {
    try {
        let data = await OrderService.getOrderStatusStatistics();
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message);
    }
}

const statisticUser = async (req, res) => {
    try {
        let data = await OrderService.statisticUser();
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message);
    }
}

module.exports = {
    addCart,
    getAllOrdersStaff,
    updateStautsOrderStaff,
    statisticMoneyMonth,
    getOrderById,
    statisticMoneyYear,
    getDataStatisticMoneyMonth,
    getDataStatisticMoneyYear,
    getOrderInStorage,
    getOrderInTransit,
    updateStatusShipper,
    getAllOrderTransited,
    monthlyRevenueReport,
    orderStatistics,
    getOrderStatusStatistics,
    statisticUser,
}