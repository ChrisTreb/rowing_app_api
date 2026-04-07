import express from 'express';
import {
    addPosition,
    getPositionsByParticipant
} from '../controllers/positionsController.js';

const router = express.Router();

router.post('/', addPosition);
router.get('/participant/:participantId', getPositionsByParticipant);

export default router;