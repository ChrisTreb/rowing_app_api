import express from 'express';
import {
    getClubs,
    getClubById,
    createClub,
    updateClub,
    deleteClub
} from '../controllers/clubsController.js';

const router = express.Router();

/**
 * @swagger
 * /clubs:
 *   get:
 *     tags: [Clubs]
 *     summary: Récupérer tous les clubs
 *     responses:
 *       200:
 *         description: Liste des clubs récupérée avec succès
 */
router.get('/', getClubs);

/**
 * @swagger
 * /clubs/{id}:
 *   get:
 *     tags: [Clubs]

 *     summary: Récupérer un club par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du club
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Club trouvé
 *       404:
 *         description: Club non trouvé
 */
router.get('/:id', getClubById);

/**
 * @swagger
 * /clubs:
 *   post:
 *     tags: [Clubs]
 *     summary: Créer un nouveau club
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               city:
 *                 type: string
 *     responses:
 *       201:
 *         description: Club créé avec succès
 */
router.post('/', createClub);

/**
 * @swagger
 * /clubs/{id}:
 *   put:
 *    tags: [Clubs]
 *     summary: Mettre à jour un club
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du club
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
 *               city:
 *                 type: string
 *     responses:
 *       200:
 *         description: Club mis à jour avec succès
 *       404:
 *         description: Club non trouvé
 */
router.put('/:id', updateClub);

/**
 * @swagger
 * /clubs/{id}:
 *   delete:
 *     tags: [Clubs]
 *     summary: Supprimer un club
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du club
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Club supprimé avec succès
 *       404:
 *         description: Club non trouvé
 */
router.delete('/:id', deleteClub);

export default router;