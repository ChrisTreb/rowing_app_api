import express from 'express';
import {
    createEvent,
    getEvents,
    getFullEvent
} from '../controllers/eventsController.js';

const router = express.Router();

router.post('/', createEvent);
router.get('/', getEvents);
router.get('/:id/full', getFullEvent);

export default router;