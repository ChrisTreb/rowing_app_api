import express from 'express';
import {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} from '../controllers/usersController.js';

const router = express.Router();

/**
 * @swagger
 * /users:
 *   post:
 *    tags: [Users]
 *    summary: Créer un nouvel utilisateur
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              apikey:
 *                type: string
 *              name:
 *                type: string
 *              rc_id:
 *                type: integer
 *    responses:
 *      201:
 *        description: Utilisateur créé avec succès
 */
router.post('/', createUser);

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [Users]
 *     summary: Récupérer tous les utilisateurs
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/', getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Récupérer un utilisateur par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/:id', getUserById);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags: [Users]
 *     summary: Mettre à jour un utilisateur
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              apikey:
 *                type: string
 *              name:
 *                type: string
 *              rc_id:
 *                type: integer
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 */
router.put('/:id', updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Supprimer un utilisateur
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 */
router.delete('/:id', deleteUser);

export default router;