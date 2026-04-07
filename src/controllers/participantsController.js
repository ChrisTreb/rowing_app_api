import { pool } from '../db.js';

// CREATE
export const createParticipant = async (req, res) => {
    try {
        const { race_id, bib, name, color, key } = req.body;

        const result = await pool.query(
            `INSERT INTO race_participant
      (rp_race_id, rp_bib, rp_name, rp_color, rp_key)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *`,
            [race_id, bib, name, color, key]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// READ
export const getParticipantsByRace = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT * FROM race_participant WHERE rp_race_id = $1`,
            [req.params.raceId]
        );

        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};