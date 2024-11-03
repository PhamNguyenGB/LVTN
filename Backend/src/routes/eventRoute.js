import express from 'express';
import { checkVerifyTokenAdmin, checkVerifyTokenUser } from '../middleware/AuthStaff';
import EventController from '../controllers/eventController';

const router = express.Router();

const EventRoute = (app) => {
    router.get('/', checkVerifyTokenAdmin, EventController.getAllEvent);
    router.post('/create', checkVerifyTokenAdmin, EventController.createEvent);
    router.put('/update', checkVerifyTokenAdmin, EventController.updateEvent);
    router.delete('/delete/:id', checkVerifyTokenAdmin, EventController.deleteEvent);
    router.get('/findOne/:nameEvent', checkVerifyTokenUser, EventController.findEventByName);

    return app.use('/api/event', router);
};

export default EventRoute;