import express from 'express';
import {
    createEvent,
    getEvents,
    getEventById,
    getFullEvent,
    updateEvent,
    deleteEvent
} from '../controllers/eventsController.js';

const router = express.Router();

/**
 * @swagger
 * /events:
 *   post:
 *     tags: [Events]
 *     summary: Créer un événement
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               name:
 *                 type: string
 *               visiblity:
 *                 type: integer
 *               start_at:
 *                 type: timestamp
 *                 format: date
 *               end_at:
 *                 type: timestamp
 *                 format: date
 *               latitude:
 *                 type: double
 *              longitude:
 *                type: double
 *              zoom:
 *                type: integer
 *              map_layer:
 *                type: string
 *     responses:
 *       201:
 *         description: Événement créé avec succès
 */
router.post('/', createEvent);

/**
 * @swagger
 * /events:
 *   get:
 *     tags: [Events]
 *     summary: Récupérer tous les événements
 *     responses:
 *       200:
 *         description: Liste des événements
 */
router.get('/', getEvents);

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     tags: [Events]
 *     summary: Récupérer un événement par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'événement
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Événement trouvé
 *       404:
 *         description: Événement non trouvé
 */
router.get('/:id', getEventById);

/**
 * @swagger
 * /events/{id}/full:
 *   get:
 *     tags: [Events]
 *     summary: Récupérer un événement complet (avec relations)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'événement
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Événement complet
 *       404:
 *         description: Événement non trouvé
 */
router.get('/:id/full', getFullEvent);

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     tags: [Events]
 *     summary: Mettre à jour un événement
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'événement
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               name:
 *                 type: string
 *               visiblity:
 *                 type: integer
 *               start_at:
 *                 type: timestamp
 *                 format: date
 *               end_at:
 *                 type: timestamp
 *                 format: date-time
 *               latitude:
 *                 type: double
 *              longitude:
 *                type: double
 *              zoom:
 *                type: integer
 *              map_layer:
 *                type: string
 *     responses:
 *       200:
 *         description: Événement mis à jour
 *       404:
 *         description: Événement non trouvé
 */
router.put('/:id', updateEvent);

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     tags: [Events]
 *     summary: Supprimer un événement
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'événement
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Événement supprimé
 *       404:
 *         description: Événement non trouvé
 */
router.delete('/:id', deleteEvent);

export default router;