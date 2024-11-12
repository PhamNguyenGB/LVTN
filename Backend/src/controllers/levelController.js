import LevelService from "../services/levelService";

const createLevel = async (req, res) => {
    try {
        const request = await LevelService.createLevelService(req.body, req.user);
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
            mess: 'error creating level',
            status: -1,
        });

    }
};

const getAllLevels = async (req, res) => {
    try {
        const request = await LevelService.getAllLevelsService();
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
            mess: 'error getting event',
            status: -1,
        });
    }
};

const updateLevel = async (req, res) => {
    try {
        const request = await LevelService.UpdateLevelService(req.body, req.user);
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
            mess: 'error updating event',
            status: -1,
        });

    }
};

const deleteLevel = async (req, res) => {
    try {
        const request = await LevelService.deleteLevelService(req.params.id);
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
            mess: 'error deleting event',
            status: -1,
        });
    }
};

module.exports = {
    createLevel,
    getAllLevels,
    updateLevel,
    deleteLevel,
};