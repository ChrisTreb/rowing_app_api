import express from 'express';
import {
    createTrack,
    getTracksByEvent,
    updateTrack,
    getTracksWithRacesByEvent,
    deleteTrack
} from '../controllers/tracksController.js';

const router = express.Router();

/**
 * @swagger
 * /tracks:
 *   post:
 *     tags: [Tracks]
 *     summary: Créer un parcours (track)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               event_id:
 *                 type: integer
 *               name:
 *                 type: string
 *               gpx:
 *                 type: string
 *               color:
 *                 type: string
 *               enabled:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Parcours créé avec succès
 */
router.post('/', createTrack);

/**
 * @swagger
 * /tracks/event/{eventId}:
 *   get:
 *     tags: [Tracks]
 *     summary: Récupérer les parcours d'un événement
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         description: ID de l'événement
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des parcours
 */
router.get('/event/:eventId', getTracksByEvent);

/**
 * @swagger
 * /tracks/{trackId}:
 *   put:
 *     tags: [Tracks]
 *     summary: Mettre à jour un parcours
 *     parameters:
 *       - in: path
 *         name: trackId
 *         required: true
 *         description: ID du parcours
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               event_id:
 *                 type: integer
 *               name:
 *                 type: string
 *               gpx:
 *                 type: string
 *               color:
 *                 type: string
 *               enabled:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Parcours mis à jour
 *       404:
 *         description: Parcours non trouvé
 */
router.put('/:trackId', updateTrack);

/**
 * @swagger
 * /tracks/{trackId}:
 *   delete:
 *     tags: [Tracks]
 *     summary: Supprimer un parcours
 *     parameters:
 *       - in: path
 *         name: trackId
 *         required: true
 *         description: ID du parcours
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Parcours supprimé
 *       404:
 *         description: Parcours non trouvé
 */
router.delete('/:trackId', deleteTrack);

/**
 * @swagger
 * /tracks/event/{id}/with-races:
 *   get:
 *     tags: [Tracks]
 *     summary: Récupérer les parcours avec leurs courses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'événement
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Parcours avec leurs courses
 */
router.get('/event/:id/with-races', getTracksWithRacesByEvent);

export default router;