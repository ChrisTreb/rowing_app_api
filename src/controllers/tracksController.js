import { pool } from '../db.js';

// CREATE
export const createTrack = async (req, res) => {
    try {
        const { event_id, name, gpx, color, enabled } = req.body;

        const result = await pool.query(
            `INSERT INTO race_event_track 
      (ret_event_id, ret_name, ret_gpx, ret_color, ret_enabled)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *`,
            [event_id, name, gpx, color, enabled]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// READ
export const getTracksByEvent = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT * FROM race_event_track WHERE ret_event_id = $1`,
            [req.params.eventId]
        );

        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};