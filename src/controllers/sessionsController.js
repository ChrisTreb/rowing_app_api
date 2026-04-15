import { pool } from '../db.js';

// CREATE SESSION
export const createSession = async (req, res) => {
    try {
        const { user_id, expires_at } = req.body;
        const result = await pool.query(
            `INSERT INTO session (s_user_id, s_expires_at)
       VALUES ($1, $2)
       RETURNING *`,
            [user_id, expires_at]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET SESSION BY ID
export const getSessionById = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM session WHERE se_id = $1',
            [req.params.id]
        );
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET ALL SESSIONS
export const getSessions = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM session');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE SESSION
export const deleteSession = async (req, res) => {
    try {
        const result = await pool.query(
            'DELETE FROM session WHERE se_id = $1 RETURNING *',
            [req.params.id]
        );
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET ALL SESSIONS WITH USER INFO
export const getSessionsWithUserInfo = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        s.*,
        u.usr_name
      FROM session s
      JOIN app_user u ON s.se_user_id = u.usr_id
    `);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE SESSION
export const updateSession = async (req, res) => {
  try {
    const { user_id, expires_at } = req.body;
    const result = await pool.query(
      `UPDATE session SET
        se_user_id = $1,
        se_expires_at = $2
      WHERE se_id = $3
      RETURNING *`,
      [user_id, expires_at, req.params.id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
