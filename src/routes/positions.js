import express from 'express';
import {
    addPosition,
    getPositionsByParticipant,
    getLastPositionByParticipant,
    getLatestPositionsByEvent,
    deletePositionsByParticipant
} from '../controllers/positionsController.js';

const router = express.Router();

router.post('/', addPosition);
router.get('/participant/:participantId', getPositionsByParticipant);
router.get('/participant/:participantId/last', getLastPositionByParticipant);
router.get('/event/:eventId/latest', getLatestPositionsByEvent);
router.delete('/participant/:participantId', deletePositionsByParticipant);

export default router;