import SoldProduct from '../services/soldProductService';

const addSoldProduct = async (req, res) => {
    try {
        const data = await SoldProduct.addSoldProduct(req.body);
        if (data.status === 0)
            return res.status(200).json(data);
        return res.status(500).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message);

    }
}

module.exports = {
    addSoldProduct,
}