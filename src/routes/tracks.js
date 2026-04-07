import express from 'express';
import {
    createTrack,
    getTracksByEvent
} from '../controllers/tracksController.js';

const router = express.Router();

router.post('/', createTrack);
router.get('/event/:eventId', getTracksByEvent);

export default router;