import SoldProductService from '../services/soldProductService';

const addSoldProduct = async (req, res) => {
    try {
        const data = await SoldProductService.addSoldProduct(req.body);
        if (data.status === 0)
            return res.status(200).json(data);
        return res.status(500).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message);

    }
}

const getAllSoldProducts = async (req, res) => {
    try {
        const data = await SoldProductService.getAllSoldProducts();
        return res.status(200).json({
            status: data.status,
            data: data.data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: -1,
            mess: error.message,
        });
    }
}

module.exports = {
    addSoldProduct,
    getAllSoldProducts
}