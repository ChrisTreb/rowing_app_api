import express from 'express';
import {
    createParticipant,
    getParticipantsByRace
} from '../controllers/participantsController.js';

const router = express.Router();

router.post('/', createParticipant);
router.get('/race/:raceId', getParticipantsByRace);

export default router;