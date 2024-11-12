import ImageHomeSevice from '../services/imageHomeService';

const createImageHome = async (req, res) => {
    try {
        console.log('check req', req);

        const request = await ImageHomeSevice.createImageHomeService(req.file, req.body, req.user);
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

const getAllImageHome = async (req, res) => {
    try {
        const request = await ImageHomeSevice.getAllImageHomeService();
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

const deleteImageHome = async (req, res) => {
    try {
        const request = await ImageHomeSevice.deleteImageHomeService(req.params.id);
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
    createImageHome,
    getAllImageHome,
    deleteImageHome,
};