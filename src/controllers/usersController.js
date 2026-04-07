import { pool } from '../db.js';

// CREATE
export const createUser = async (req, res) => {
    try {
        const { google_id, email, name, apikey, rc_id } = req.body;

        const result = await pool.query(
            `INSERT INTO app_user 
       (usr_google_id, usr_email, usr_name, usr_apikey, usr_rc_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
            [google_id, email, name, apikey, rc_id]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// READ ALL
export const getUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM app_user');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// READ ONE
export const getUserById = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM app_user WHERE usr_id = $1',
            [req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};