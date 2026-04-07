import { pool } from '../db.js';

// CREATE EVENT
export const createEvent = async (req, res) => {
    try {
        const {
            user_id,
            name,
            visibility,
            start_at,
            end_at,
            latitude,
            longitude,
            zoom,
            map_layer
        } = req.body;

        const result = await pool.query(
            `INSERT INTO race_event (
        re_user_id, re_name, re_visibility,
        re_start_at, re_end_at,
        re_latitude, re_longitude, re_zoom, re_map_layer
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *`,
            [
                user_id,
                name,
                visibility,
                start_at,
                end_at,
                latitude,
                longitude,
                zoom,
                map_layer
            ]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET EVENTS
export const getEvents = async (req, res) => {
    try {
        const result = await pool.query(`
      SELECT re.*, u.usr_name
      FROM race_event re
      JOIN app_user u ON re.re_user_id = u.usr_id
      ORDER BY re.re_start_at DESC
    `);

        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};