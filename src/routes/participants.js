import express from 'express';
import {
    createParticipant,
    getParticipantsByRace,
    updateParticipant,
    deleteParticipant
} from '../controllers/participantsController.js';

const router = express.Router();

router.post('/', createParticipant);
router.get('/race/:raceId', getParticipantsByRace);
router.put('/:participantId', updateParticipant);
router.delete('/:participantId', deleteParticipant);

export default router;