import { pool } from '../db.js';

// CREATE
export const createTrack = async (req, res) => {
    try {
        const { event_id, name, gpx, color, enabled } = req.body;

        const result = await pool.query(
            `INSERT INTO race_event_track 
                (ret_re_id, ret_name, ret_xml_gpx, ret_color, ret_enabled)
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

// UPDATE
export const updateTrack = async (req, res) => {
    try {
        const { name, gpx, color, enabled } = req.body;
        const result = await pool.query(
            `UPDATE race_event_track SET ret_name = $1, ret_gpx = $2, ret_color = $3, ret_enabled = $4 WHERE ret_id = $5 RETURNING *`,
            [name, gpx, color, enabled, req.params.trackId]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET ALL
export const getTracksWithRacesByEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            `SELECT 
                ret.*, 
                (
                    SELECT json_agg(json_build_object('ra_id', ra_id, 'ra_type', ra_type, 'ra_name', ra_name))
                    FROM race
                    WHERE ra_event_id = $1
                ) AS races
                FROM race_event_track ret
                WHERE ret_event_id = $1
      `, [id]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET ALL with participants
export const getTracksWithRacesAndParticipantsByEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            `SELECT 
                ret.*,
                (
                SELECT json_agg(json_build_object(
                    'ra_id', ra_id, 'ra_type', ra_type, 'ra_name', ra_name,
                    'participants', (
                    SELECT json_agg(json_build_object('rp_id', rp_id, 'rp_bib', rp_bib, 'rp_name', rp_name, 'rp_color', rp_color))
                    FROM race_participant WHERE rp_race_id = ra_id
                ))) 
        FROM race_event_track ret
        WHERE ret_event_id = $1
      `, [id]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE
export const deleteTrack = async (req, res) => {
    try {
        const result = await pool.query(
            `DELETE FROM race_event_track WHERE ret_id = $1 RETURNING *`,
            [req.params.trackId]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Track not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET ALL POSITIONS FOR A PARTICIPANT
export const getPositionsByParticipant = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT * FROM race_participant_position WHERE rpp_participant_id = $1 ORDER BY rpp_timestamp ASC`,
            [req.params.participantId]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
