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

// UPDATE
export const updateUser = async (req, res) => {
    try {
        const { google_id, email, name, apikey, rc_id } = req.body;
        const result = await pool.query(
            `UPDATE app_user SET
                usr_google_id = $1,
                usr_email = $2,
                usr_name = $3,
                usr_apikey = $4,
                usr_rc_id = $5
            WHERE usr_id = $6
            RETURNING *`,
            [google_id, email, name, apikey, rc_id, req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE
export const deleteUser = async (req, res) => {
    try {        
        const result = await pool.query(
            `DELETE FROM app_user WHERE usr_id = $1 RETURNING *`,
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