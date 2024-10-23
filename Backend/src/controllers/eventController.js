import EventService from "../services/eventService";

const createEvent = async (req, res) => {
    try {
        const request = await EventService.createEventService(req.body, req.user);
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
            mess: 'error creating event',
            status: -1,
        });

    }
};

const getAllEvent = async (req, res) => {
    try {
        const request = await EventService.getAllEventService();
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

const updateEvent = async (req, res) => {
    try {
        const request = await EventService.UpdateEventService(req.body, req.user);
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

const deleteEvent = async (req, res) => {
    try {
        const request = await EventService.deleteEventService(req.params.id);
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

const findEventByName = async (req, res) => {
    try {
        const request = await EventService.findEventByNameSevice(req.params.nameEvent, req.user);
        if (request.status === 0)
            return res.status(200).json({
                status: 0,
                data: request?.data,
                mess: request.mess
            });
        return res.status(500).json({
            mess: request.mess,
            status: -1,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mess: 'error find event',
            status: -1,
        });
    }
};

module.exports = {
    createEvent,
    getAllEvent,
    updateEvent,
    deleteEvent,
    findEventByName,
};