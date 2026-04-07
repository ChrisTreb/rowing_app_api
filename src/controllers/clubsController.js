import { pool } from '../db.js';

// GET ALL
export const getClubs = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM rowing_club ORDER BY rc_name ASC'
        );

        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// GET ONE
export const getClubById = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM rowing_club WHERE rc_id = $1',
            [req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Club not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// CREATE
export const createClub = async (req, res) => {
    try {
        const { name, nickname } = req.body;

        const result = await pool.query(
            `INSERT INTO rowing_club (rc_name, rc_nickname)
       VALUES ($1, $2)
       RETURNING *`,
            [name, nickname]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);

        // gestion simple des doublons
        if (err.code === '23505') {
            return res.status(400).json({ error: 'Club already exists' });
        }

        res.status(500).json({ error: err.message });
    }
};