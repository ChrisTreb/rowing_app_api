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

// GET LAST POSITION
export const getLastPositionByParticipant = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT * FROM race_participant_position
       WHERE rpp_participant_id = $1
       ORDER BY rpp_timestamp DESC LIMIT 1`,
            [req.params.participantId]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Position not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET ALL POSITIONS FOR AN EVENT (for live tracking)
export const getLatestPositionsByEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            `
      SELECT json_agg(
        json_build_object(
          'participant', rp,
          'last_position', (
            SELECT json_build_object(
                'lat', pos.rpp_latitude,
                'lng', pos.rpp_longitude,
                'timestamp', pos.rpp_timestamp
            )
            FROM race_participant_position pos
            WHERE pos.rpp_participant_id = rp.rp_id
            ORDER BY pos.rpp_timestamp DESC LIMIT 1
          )
        )
      ) AS data
      FROM race_participant rp
      JOIN race r ON rp.rp_race_id = r.ra_id
      WHERE r.ra_event_id = $1
    `, [id]
        );  
        res.json(result.rows[0].data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE ALL POSITIONS FOR A PARTICIPANT
export const deletePositionsByParticipant = async (req, res) => {
    try {
        const result = await pool.query(
            `DELETE FROM race_participant_position WHERE rpp_participant_id = $1`,
            [req.params.participantId]
        );
        res.json({ message: 'Positions deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};