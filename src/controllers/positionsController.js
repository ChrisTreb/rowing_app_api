import { pool } from '../db.js';

// INSERT POSITION (tracking temps réel)
export const addPosition = async (req, res) => {
    try {
        const { participant_id, latitude, longitude, timestamp } = req.body;

        const result = await pool.query(
            `INSERT INTO race_participant_position
      (rpp_participant_id, rpp_latitude, rpp_longitude, rpp_timestamp)
      VALUES ($1,$2,$3,$4)
      RETURNING *`,
            [participant_id, latitude, longitude, timestamp]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET TRACK
export const getPositionsByParticipant = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT * FROM race_participant_position
       WHERE rpp_participant_id = $1
       ORDER BY rpp_timestamp ASC LIMIT 1000`,
            [req.params.participantId]
        );

        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};