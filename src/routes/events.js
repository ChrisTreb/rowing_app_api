import express from 'express';
import {
    createEvent,
    getEvents,
    getEventById,
    getFullEvent,
    updateEvent,
    deleteEvent
} from '../controllers/eventsController.js';

const router = express.Router();

router.post('/', createEvent);
router.get('/', getEvents);
router.get('/:id', getEventById);
router.get('/:id/full', getFullEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

export default router;