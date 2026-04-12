import express from 'express';
import {
    createParticipant,
    getParticipantsByRace,
    updateParticipant,
    deleteParticipant
} from '../controllers/participantsController.js';

const router = express.Router();

/**
 * @swagger
 * /participants:
 *   post:
 *     tags: [Participants]
 *     summary: Ajouter un participant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               race_id:
 *                 type: integer
 *               bib:
 *                 type: string
 *               name:
 *                 type: string
 *               color:
 *                type: string
 *               key:
 *                 type: string
 *     responses:
 *       201:
 *         description: Participant créé avec succès
 */
router.post('/', createParticipant);

/**
 * @swagger
 * /participants/race/{raceId}:
 *   get:
 *     tags: [Participants]
 *     summary: Récupérer les participants d'une course
 *     parameters:
 *       - in: path
 *         name: raceId
 *         required: true
 *         description: ID de la course
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des participants
 */
router.get('/race/:raceId', getParticipantsByRace);

/**
 * @swagger
 * /participants/{participantId}:
 *   put:
 *     tags: [Participants]
 *     summary: Mettre à jour un participant
 *     parameters:
 *       - in: path
 *         name: participantId
 *         required: true
 *         description: ID du participant
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               race_id:
 *                 type: integer
 *               bib:
 *                 type: string
 *               name:
 *                 type: string
 *               color:
 *                type: string
 *               key:
 *                 type: string
 *     responses:
 *       200:
 *         description: Participant mis à jour
 *       404:
 *         description: Participant non trouvé
 */
router.put('/:participantId', updateParticipant);

/**
 * @swagger
 * /participants/{participantId}:
 *   delete:
 *     tags: [Participants]
 *     summary: Supprimer un participant
 *     parameters:
 *       - in: path
 *         name: participantId
 *         required: true
 *         description: ID du participant
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Participant supprimé
 *       404:
 *         description: Participant non trouvé
 */
router.delete('/:participantId', deleteParticipant);

export default router;