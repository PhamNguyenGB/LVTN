import PointService from "../services/pointService";

const createPoint = async (req, res) => {
    try {
        const request = await PointService.createPointService(req.body, req.user);
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
            mess: 'error creating point',
            status: -1,
        });

    }
};

const getAllPoint = async (req, res) => {
    try {
        const request = await PointService.getAllPointService();
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
            mess: 'error getting point',
            status: -1,
        });
    }
};

const updatePoint = async (req, res) => {
    try {
        const request = await PointService.UpdatePointService(req.body, req.user);
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
            mess: 'error updating point',
            status: -1,
        });

    }
};

const deletePoint = async (req, res) => {
    try {
        const request = await PointService.deletePointService(req.params.id);
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
            mess: 'error deleting point',
            status: -1,
        });
    }
};

module.exports = {
    createPoint,
    getAllPoint,
    updatePoint,
    deletePoint,
};