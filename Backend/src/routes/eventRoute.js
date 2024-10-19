import express from 'express';
import { checkVerifyTokenAdmin } from '../middleware/AuthStaff';
import EventController from '../controllers/eventController';

const router = express.Router();

const EventRoute = (app) => {
    router.get('/', EventController.getAllEvent);
    router.post('/create', checkVerifyTokenAdmin, EventController.createEvent);
    router.put('/update', checkVerifyTokenAdmin, EventController.updateEvent);
    router.delete('/delete/:id', checkVerifyTokenAdmin, EventController.deleteEvent);

    return app.use('/api/event', router);
};

export default EventRoute;