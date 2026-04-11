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

/**
 * @swagger
 * /races:
 *   post:
 *     tags: [Races]
 *     summary: Créer une course
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               eventId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Course créée avec succès
 */
router.post('/', createRace);

/**
 * @swagger
 * /races/event/{eventId}:
 *   get:
 *     tags: [Races]
 *     summary: Récupérer les courses d'un événement
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         description: ID de l'événement
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des courses
 */
router.get('/event/:eventId', getRacesByEvent);

/**
 * @swagger
 * /races/{raceId}:
 *   put:
 *     tags: [Races]
 *     summary: Mettre à jour une course
 *     parameters:
 *       - in: path
 *         name: raceId
 *         required: true
 *         description: ID de la course
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Course mise à jour
 *       404:
 *         description: Course non trouvée
 */
router.put('/:raceId', updateRace);

/**
 * @swagger
 * /races/{raceId}:
 *   delete:
 *     tags: [Races]
 *     summary: Supprimer une course
 *     parameters:
 *       - in: path
 *         name: raceId
 *         required: true
 *         description: ID de la course
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course supprimée
 *       404:
 *         description: Course non trouvée
 */
router.delete('/:raceId', deleteRace);

/**
 * @swagger
 * /races/event/{eventId}/with-participants:
 *   get:
 *     tags: [Races]
 *     summary: Récupérer les courses avec leurs participants
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         description: ID de l'événement
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Courses avec participants
 */
router.get('/event/:eventId/with-participants', getRacesWithParticipantsByEvent);

/**
 * @swagger
 * /races/event/{eventId}/with-participants-data:
 *   get:
 *     tags: [Races]
 *     summary: Récupérer les courses avec participants et leurs données
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         description: ID de l'événement
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Courses avec participants et données
 */
router.get('/event/:eventId/with-participants-data', getRacesWithParticipantsDataByEvent);

/**
 * @swagger
 * /races/event/{eventId}/with-participants-and-data:
 *   get:
 *     tags: [Races]
 *     summary: Récupérer les courses avec participants + données complètes
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         description: ID de l'événement
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Courses complètes avec participants et données
 */
router.get('/event/:eventId/with-participants-and-data', getRacesWithParticipantsAndDataByEvent);

export default router;