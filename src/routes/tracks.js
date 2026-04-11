import express from 'express';
import {
    createTrack,
    getTracksByEvent,
    updateTrack,
    getTracksWithRacesByEvent,
    deleteTrack
} from '../controllers/tracksController.js';

const router = express.Router();

router.post('/', createTrack);
router.get('/event/:eventId', getTracksByEvent);
router.put('/:trackId', updateTrack);
router.delete('/:trackId', deleteTrack);
router.get('/event/:id/with-races', getTracksWithRacesByEvent);

export default router;