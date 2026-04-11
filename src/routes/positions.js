import express from 'express';
import {
    addPosition,
    getPositionsByParticipant,
    getLastPositionByParticipant,
    getLatestPositionsByEvent,
    deletePositionsByParticipant
} from '../controllers/positionsController.js';

const router = express.Router();

/**
 * @swagger
 * /positions:
 *   post:
 *     tags: [Positions]
 *     summary: Ajouter une position
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               participantId:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Position ajoutée avec succès
 */
router.post('/', addPosition);

/**
 * @swagger
 * /positions/participant/{participantId}:
 *   get:
 *     tags: [Positions]
 *     summary: Récupérer toutes les positions d'un participant
 *     parameters:
 *       - in: path
 *         name: participantId
 *         required: true
 *         description: ID du participant
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des positions
 */
router.get('/participant/:participantId', getPositionsByParticipant);

/**
 * @swagger
 * /positions/participant/{participantId}/last:
 *   get:
 *     tags: [Positions]
 *     summary: Récupérer la dernière position d'un participant
 *     parameters:
 *       - in: path
 *         name: participantId
 *         required: true
 *         description: ID du participant
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dernière position trouvée
 *       404:
 *         description: Aucune position trouvée
 */
router.get('/participant/:participantId/last', getLastPositionByParticipant);

/**
 * @swagger
 * /positions/event/{eventId}/latest:
 *   get:
 *     tags: [Positions]
 *     summary: Récupérer les dernières positions de tous les participants d'un événement
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         description: ID de l'événement
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des dernières positions
 */
router.get('/event/:eventId/latest', getLatestPositionsByEvent);

/**
 * @swagger
 * /positions/participant/{participantId}:
 *   delete:
 *     tags: [Positions]
 *     summary: Supprimer toutes les positions d'un participant
 *     parameters:
 *       - in: path
 *         name: participantId
 *         required: true
 *         description: ID du participant
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Positions supprimées avec succès
 */
router.delete('/participant/:participantId', deletePositionsByParticipant);

export default router;