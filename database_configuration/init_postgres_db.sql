-- Extensions utiles
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

---------------------
-- 1. ROWING CLUB --
---------------------
CREATE TABLE rowing_club (
    rc_id SERIAL PRIMARY KEY,
    rc_name TEXT NOT NULL UNIQUE,
    rc_nickname TEXT NOT NULL UNIQUE
);

---------------------
-- 2. USERS
---------------------
CREATE TABLE app_user (
    usr_id SERIAL PRIMARY KEY,
    usr_google_id TEXT NOT NULL UNIQUE,
    usr_email TEXT NOT NULL UNIQUE,
    usr_name TEXT,
    usr_apikey TEXT NOT NULL UNIQUE,
    usr_rc_id INTEGER NOT NULL REFERENCES rowing_club(rc_id)
);

---------------------
-- 3. SESSIONS
---------------------
CREATE TABLE session (
    se_id SERIAL PRIMARY KEY,
    se_user_id INTEGER NOT NULL REFERENCES app_user(usr_id) ON DELETE CASCADE,
    se_expires_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX idx_session_user ON session(se_user_id);
CREATE INDEX idx_session_expiration ON session(se_expires_at);

---------------------
-- 4. EVENTS
---------------------
CREATE TABLE race_event (
    re_id SERIAL PRIMARY KEY,
    re_user_id INTEGER NOT NULL REFERENCES app_user(usr_id) ON DELETE CASCADE,
    re_name TEXT NOT NULL,
    re_visibility INTEGER NOT NULL CHECK (re_visibility IN (0,1)),
    re_start_at TIMESTAMPTZ NOT NULL,
    re_end_at TIMESTAMPTZ NOT NULL,
    re_edit_token TEXT NOT NULL UNIQUE,
    re_view_token TEXT NOT NULL UNIQUE,
    re_latitude DOUBLE PRECISION NOT NULL,
    re_longitude DOUBLE PRECISION NOT NULL,
    re_zoom INTEGER NOT NULL,
    re_map_layer TEXT NOT NULL,

    CHECK (re_end_at >= re_start_at)
);

CREATE INDEX idx_event_user ON race_event(re_user_id);
CREATE INDEX idx_event_tokens ON race_event(re_edit_token, re_view_token);

---------------------
-- 5. TRACKS
---------------------
CREATE TABLE race_event_track (
    ret_id SERIAL PRIMARY KEY,
    ret_event_id INTEGER NOT NULL REFERENCES race_event(re_id) ON DELETE CASCADE,
    ret_name TEXT NOT NULL,
    ret_gpx TEXT NOT NULL,
    ret_color TEXT NOT NULL,
    ret_enabled BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE INDEX idx_track_event ON race_event_track(ret_event_id);

---------------------
-- 6. RACES
---------------------
CREATE TABLE race (
    ra_id SERIAL PRIMARY KEY,
    ra_event_id INTEGER NOT NULL REFERENCES race_event(re_id) ON DELETE CASCADE,
    ra_type TEXT NOT NULL,
    ra_name TEXT NOT NULL
);

CREATE INDEX idx_race_event ON race(ra_event_id);

---------------------
-- 7. PARTICIPANTS
---------------------
CREATE TABLE race_participant (
    rp_id SERIAL PRIMARY KEY,
    rp_race_id INTEGER NOT NULL REFERENCES race(ra_id) ON DELETE CASCADE,
    rp_bib TEXT,
    rp_name TEXT,
    rp_color TEXT,
    rp_key TEXT NOT NULL,
    rp_updated_at TIMESTAMPTZ
);

CREATE INDEX idx_participant_race ON race_participant(rp_race_id);
CREATE INDEX idx_participant_key ON race_participant(rp_key);

---------------------
-- 8. POSITIONS
---------------------
CREATE TABLE race_participant_position (
    rpp_id BIGSERIAL PRIMARY KEY,
    rpp_participant_id INTEGER NOT NULL REFERENCES race_participant(rp_id) ON DELETE CASCADE,
    rpp_timestamp TIMESTAMPTZ NOT NULL,
    rpp_latitude DOUBLE PRECISION NOT NULL,
    rpp_longitude DOUBLE PRECISION NOT NULL
);

CREATE INDEX idx_position_participant ON race_participant_position(rpp_participant_id);
CREATE INDEX idx_position_time ON race_participant_position(rpp_timestamp);
CREATE INDEX idx_position_participant_time ON race_participant_position (rpp_participant_id, rpp_timestamp DESC);

---------------------
-- 9. DATA INIT
---------------------
INSERT INTO rowing_club (rc_id, rc_name, rc_nickname) VALUES
    (-1, 'Tous', 'Public')
ON CONFLICT DO NOTHING;

INSERT INTO rowing_club (rc_name, rc_nickname) VALUES
    ('Aviron Brestois', 'AVB'),
    ('Yole Club Brest Iroise', 'YCBI'),
    ('Saint Malo', 'SNBSM')
ON CONFLICT DO NOTHING;