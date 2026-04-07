import { pool } from '../db.js';

// CREATE
export const createRace = async (req, res) => {
    try {
        const { event_id, type, name } = req.body;

        const result = await pool.query(
            `INSERT INTO race (ra_event_id, ra_type, ra_name)
       VALUES ($1,$2,$3)
       RETURNING *`,
            [event_id, type, name]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// READ
export const getRacesByEvent = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT * FROM race WHERE ra_event_id = $1`,
            [req.params.eventId]
        );

        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};