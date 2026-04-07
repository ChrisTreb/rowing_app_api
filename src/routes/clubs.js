import express from 'express';
import {
    getClubs,
    getClubById,
    createClub
} from '../controllers/clubsController.js';

const router = express.Router();

router.get('/', getClubs);
router.get('/:id', getClubById);
router.post('/', createClub);

export default router;