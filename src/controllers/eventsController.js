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

// GET /events/:id/full - Get full event details with races, participants, and last positions
export const getFullEvent = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            `
      SELECT json_build_object(
        'event', re,
        'races', (
          SELECT json_agg(
            json_build_object(
              'race', r,
              'participants', (
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
                      ORDER BY pos.rpp_timestamp DESC
                      LIMIT 1
                    )
                  )
                )
                FROM race_participant rp
                WHERE rp.rp_race_id = r.ra_id
              )
            )
          )
          FROM race r
          WHERE r.ra_event_id = re.re_id
        )
      ) AS data
      FROM race_event re
      WHERE re.re_id = $1
      `,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }

        res.json(result.rows[0].data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};