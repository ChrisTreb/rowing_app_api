import express from 'express';
import {
    createRace,
    getRacesByEvent
} from '../controllers/racesController.js';

const router = express.Router();

router.post('/', createRace);
router.get('/event/:eventId', getRacesByEvent);

export default router;