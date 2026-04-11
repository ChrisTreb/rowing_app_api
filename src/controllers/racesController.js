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

// UPDATE
export const updateRace = async (req, res) => {
    try {
        const { type, name } = req.body;
        const result = await pool.query(
            `UPDATE race SET
                ra_type = $1,
                ra_name = $2
            WHERE ra_id = $3
            RETURNING *`,
            [type, name, req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Race not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// GET ALL
export const getRacesWithParticipantsByEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            `
      SELECT
        r.*,
        ARRAY_AGG(p.rp_id) AS participant_ids
      FROM race r
      LEFT JOIN race_participant p ON r.ra_id = p.rp_race_id
      WHERE r.ra_event_id = $1
      GROUP BY r.ra_id
    `,
            [id]
        );

        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET ALL WITH PARTICIPANTS
export const getRacesWithParticipantsAndDataByEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            `SELECT
        r.*,
        (SELECT
            JSON_AGG(
              JSON_BUILD_OBJECT(
                'id', p.rp_id,
                'bib', p.rp_bib,
                'name', p.rp_name,
                'color', p.rp_color
              )
            )
          FROM race_participant p
          WHERE p.rp_race_id = r.ra_id
        ) AS participants
      FROM race r
      WHERE r.ra_event_id = $1
    `,
            [id]
        );

        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET ALL WITH PARTICIPANTS AND POSITION DATA
export const getRacesWithParticipantsDataByEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            `SELECT r.*,
        (SELECT
            JSON_AGG(
                JSON_BUILD_OBJECT(
                    'id', rp.rp_id,
                    'bib', rp.rp_bib,
                    'name', rp.rp_name,
                    'color', rp.rp_color,
                    'last_position', (
                      SELECT JSON_BUILD_OBJECT(
                        'lat', pos.rpp_lat,
                        'lon', pos.rpp_lon,
                        'timestamp', pos.rpp_timestamp
                      ) FROM race_participant_position pos
                      WHERE pos.rpp_participant_id = rp.rp_id
                      ORDER BY pos.rpp_timestamp DESC LIMIT 1
                    )
                )
            )
            FROM race_participant rp
            WHERE rp.rp_race_id = r.ra_id
        ) AS participants
      FROM race r
      WHERE r.ra_event_id = $1
    `, [id]
        ); res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE
export const deleteRace = async (req, res) => {
    try {
        const result = await pool.query(
            'DELETE FROM race WHERE ra_id = $1 RETURNING *',
            [req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Race not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};