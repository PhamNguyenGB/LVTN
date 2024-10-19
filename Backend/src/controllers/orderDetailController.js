import OrderDetailService from '../services/orderDetailService';

const addOrderDetail = async (req, res) => {
    try {
        let data = await OrderDetailService.addOrderDetailService(req.body, req.user);
        return res.status(200).json({
            Mess: data.Mess,
            ErrC: data.ErrC,
            Data: '',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Mess: data.Mess,
            ErrC: data.ErrC,
            Data: '',
        });
    }
};

const getOrderDetail = async (req, res) => {
    try {
        let data = await OrderDetailService.getOrderDetailService(req.params.id);
        return res.status(200).json({
            Mess: data.Mess,
            ErrC: data.ErrC,
            Data: data.Data,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Mess: 'error getting order detail',
            ErrC: -1,
            Data: '',
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

module.exports = {
    addOrderDetail,
    getOrderDetail,
    totalQuantity,
};