import RegionService from "../services/regionService";

const createRegion = async (req, res) => {
    try {
        const request = await RegionService.createRegionService(req.body, req.user);
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
            mess: 'error creating region',
            status: -1,
        });
    }
};

const getAllRegion = async (req, res) => {
    try {
        const request = await RegionService.getAllRegionService();
        if (request.status === 0)
            return res.status(200).json({
                mess: request.mess,
                status: 0,
                data: request.data,
            });
        return res.status(500).json({
            mess: request.mess,
            status: -1,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mess: 'error getting all regions',
            status: -1,
        });
    }
};

const updateRegion = async (req, res) => {
    try {
        const request = await RegionService.updateRegionService(req.body, req.user);
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
            mess: 'error updating region',
            status: -1,
        });
    }
};

const deleteRegion = async (req, res) => {
    try {
        const request = await RegionService.deleteRegionService(req.params.id);
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
            mess: 'error deleting region',
            status: -1,
        });
    }
};

const fetchAllRegion = async (req, res) => {
    try {
        const request = await RegionService.fetchAllRegionService();
        return response.status(200).json(request);
    } catch (error) {
        console.log(error);
        return res.status(500).json('error fetching all regions')
    }
};

module.exports = {
    createRegion,
    getAllRegion,
    updateRegion,
    deleteRegion,
    fetchAllRegion,
};
