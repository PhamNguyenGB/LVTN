import OrderDetailService from '../services/orderDetailService';

const addOrderDetail = async (req, res) => {
    try {
        let data = await OrderDetailService.addOrderDetailService(req.body, req.user);
        return res.status(200).json({
            mess: data.mess,
            status: data.status,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mess: error.message,
            status: -1,
        });
    }
};

const getOrderDetail = async (req, res) => {
    try {
        let data = await OrderDetailService.getOrderDetailService(req.params.id);
        return res.status(200).json({
            mess: data.mess,
            status: data.status,
            data: data.data,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mess: 'error getting order detail',
            status: -1,
            data: '',
        });
    }
};

const totalQuantity = async (req, res) => {
    try {
        let totalQuantity = await OrderDetailService.TotalQuantityService();
        return res.status(200).json({ totalQuantity });
    } catch (error) {
        console.log(error);
        return res.status(500).json('error total quantity ');
    }
};

const ListCarStatistics = async (req, res) => {
    try {
        let data = await OrderDetailService.ListCarStatistics(req.params.year);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message);
    }
}

const ListSpecializedVehicleStatistics = async (req, res) => {
    try {
        let data = await OrderDetailService.ListSpecializedVehicleStatistics(req.params.year);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message);
    }
}

const ListPlaneStatistics = async (req, res) => {
    try {
        let data = await OrderDetailService.ListPlaneStatistics(req.params.year);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message);
    }
}

const ListMotorStatistics = async (req, res) => {
    try {
        let data = await OrderDetailService.ListMotorStatistics(req.params.year);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message);
    }
}

const countSoldProducts = async (req, res) => {
    try {
        let data = await OrderDetailService.countSoldProducts();
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message);
    }
}

const topSellingProducts = async (req, res) => {
    try {
        let data = await OrderDetailService.topSellingProducts();
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message);
    }
}

module.exports = {
    addOrderDetail,
    getOrderDetail,
    totalQuantity,
    ListCarStatistics,
    ListSpecializedVehicleStatistics,
    ListPlaneStatistics,
    ListMotorStatistics,
    countSoldProducts,
    topSellingProducts,
};