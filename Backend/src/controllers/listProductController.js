import listProductService from "../services/listProductService";

const createListProduct = async (req, res) => {
    try {
        const request = await listProductService.createListProductService(req.body, req.user);
        if (request.status === 0)
            return res.status(200).json({
                mess: request.mess,
                status: 0,
            });
        return res.status(500).json({
            mess: request.mess,
            status: -1
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mess: 'error creating list product',
            status: -1,
        });

    }
};

const getAllListProduct = async (req, res) => {
    try {
        const request = await listProductService.getAllListProductService();
        if (request.status === 0)
            return res.status(200).json({
                mess: request.mess,
                status: 0,
                data: request.data
            });
        return res.status(500).json({
            mess: request.mess,
            status: -1,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mess: 'error getting list product',
            status: -1,
        });
    }
};

const updateListProduct = async (req, res) => {
    try {
        const request = await listProductService.UpdateListProductService(req.body, req.user);
        if (request.status === 0)
            return res.status(200).json({
                mess: request.mess,
                status: 0,
            });
        return res.status(500).json({
            mess: request.mess,
            status: -1,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mess: 'error updating list product',
            status: -1,
        });

    }
};

const deleteListProduct = async (req, res) => {
    try {
        const request = await listProductService.deleteListProductService(req.params.id);
        if (request.status === 0)
            return res.status(200).json({
                mess: request.mess,
                status: 0,
            });
        return res.status(500).json({
            mess: request.mess,
            status: -1,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mess: 'error deleting list product',
            status: -1,
        });
    }
};

module.exports = {
    createListProduct,
    getAllListProduct,
    updateListProduct,
    deleteListProduct,
};