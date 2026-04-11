import express from 'express';
import {
    createRace,
    getRacesByEvent,
    updateRace,
    deleteRace,
    getRacesWithParticipantsByEvent,
    getRacesWithParticipantsDataByEvent,
    getRacesWithParticipantsAndDataByEvent
} from '../controllers/racesController.js';

const router = express.Router();

router.post('/', createRace);
router.get('/event/:eventId', getRacesByEvent);
router.put('/:raceId', updateRace);
router.delete('/:raceId', deleteRace);
router.get('/event/:eventId/with-participants', getRacesWithParticipantsByEvent);
router.get('/event/:eventId/with-participants-data', getRacesWithParticipantsDataByEvent);
router.get('/event/:eventId/with-participants-and-data', getRacesWithParticipantsAndDataByEvent);

export default router;