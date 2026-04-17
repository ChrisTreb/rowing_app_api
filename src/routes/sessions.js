import express from 'express';
import { 
    createSession,
    getSessionById,
    getSessions,
    deleteSession,
    getSessionsWithUserInfo,
    updateSession
  } from '../controllers/sessionsController.js';

const router = express.Router();

/**
 * @swagger
 * /sessions:
 *   post:
 *     tags: [Sessions]
 *     summary: Créer une nouvelle session
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               expires_at:
 *                 type: string
 *     responses:
 *       201:
 *         description: Session créée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.post('/', createSession);

/**
 * @swagger
 * /sessions/{id}:
 *   get:
 *     tags: [Sessions]
 *     summary: Récupérer une session par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la session
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Erreur serveur
 */
router.get('/:id', getSessionById);

/**
 * @swagger
 * /sessions:
 *   get:
 *     tags: [Sessions]
 *     summary: Récupérer toutes les sessions
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Erreur serveur
 */
router.get('/', getSessions);

/**
 * @swagger
 * /sessions/{id}:
 *   delete:
 *     tags: [Sessions]
 *     summary: Supprimer une session par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la session
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Session supprimée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.delete('/:id', deleteSession);

/**
 * @swagger
 * /sessions/with-user-info:
 *   get:
 *    tags: [Sessions]
 *    summary: Récupérer toutes les sessions avec les informations de l'utilisateur
 *    responses:
 *      200:
 *        description: OK
 *      500:
 *        description: Erreur serveur
 */
router.get('/with-user-info', getSessionsWithUserInfo);

/**
 * @swagger
 * /sessions:
 *   put:
 *     tags: [Sessions]
 *     summary: Mettre à jour une session
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la session
 *     schema:
 *       type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               expires_at:
 *                 type: string
 *     responses:
 *       200:
 *         description: Session mise à jour avec succès
 *       500:
 *         description: Erreur serveur
 */
router.put('/', updateSession);

export default router;