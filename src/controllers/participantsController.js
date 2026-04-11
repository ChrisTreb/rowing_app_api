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

// UPDATE
export const updateParticipant = async (req, res) => {
    try {
        const { bib, name, color } = req.body;
        const result = await pool.query(
            `UPDATE race_participant SET
                rp_bib = $1,
                rp_name = $2,
                rp_color = $3
            WHERE rp_id = $4
            RETURNING *`,
            [bib, name, color, req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Participant not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE
export const deleteParticipant = async (req, res) => {
    try {
        const result = await pool.query(
            `DELETE FROM race_participant WHERE rp_id = $1 RETURNING *`,
            [req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Participant not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
