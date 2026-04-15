-- Extensions utiles
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

---------------------
-- 1. ROWING CLUB --
---------------------
CREATE TABLE rowing_club (
    rc_id SERIAL PRIMARY KEY,
    rc_name TEXT NOT NULL,
    rc_nickname TEXT NOT NULL
);

---------------------
-- 2. USERS
---------------------
CREATE TABLE app_user (
    usr_id SERIAL PRIMARY KEY,
    usr_email TEXT NOT NULL UNIQUE,
    usr_name TEXT,
    usr_apikey TEXT NOT NULL UNIQUE,
    usr_rc_id INTEGER NOT NULL REFERENCES rowing_club(rc_id) ON DELETE CASCADE
);

---------------------
-- 3. SESSIONS
---------------------
CREATE TABLE session (
    se_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    se_user_id INTEGER NOT NULL REFERENCES app_user(usr_id) ON DELETE CASCADE,
    se_expires_at BIGINT NOT NULL
);

CREATE INDEX idx_session_user ON session(se_user_id);
CREATE INDEX idx_session_expiration ON session(se_expires_at);

---------------------
-- 4. EVENTS
---------------------
CREATE TABLE race_event (
    re_id SERIAL PRIMARY KEY,
    re_user_id INTEGER NOT NULL REFERENCES app_user(usr_id) ON DELETE CASCADE,
    re_eventName TEXT NOT NULL,
    re_eventVisibility INTEGER NOT NULL CHECK (re_eventVisibility IN (0,1)),
    re_eventStartDateAndTime BIGINT NOT NULL,
    re_eventEndDateAndTime BIGINT NOT NULL,
    re_eventRandomId_edit TEXT NOT NULL UNIQUE,
    re_eventRandomId_viewer TEXT NOT NULL UNIQUE,
    re_viewport_latitude DOUBLE PRECISION NOT NULL,
    re_viewport_longitude DOUBLE PRECISION NOT NULL,
    re_viewport_zoom INTEGER NOT NULL,
    re_maplayer TEXT NOT NULL,

    CHECK (re_eventEndDateAndTime >= re_eventStartDateAndTime)
);

CREATE INDEX idx_event_user ON race_event(re_user_id);
CREATE INDEX idx_event_tokens ON race_event(re_eventRandomId_edit, re_eventRandomId_viewer);

---------------------
-- 5. TRACKS
---------------------
CREATE TABLE race_event_track (
    ret_id SERIAL PRIMARY KEY,
    ret_re_id  INTEGER NOT NULL REFERENCES race_event(re_id) ON DELETE CASCADE,
    ret_name TEXT NOT NULL,
    ret_xml_gpx TEXT NOT NULL,
    ret_color TEXT NOT NULL,
    ret_enabled INTEGER NOT NULL CHECK (ret_enabled IN (0,1))
);

CREATE INDEX idx_track_event ON race_event_track(ret_re_id);

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
    rp_key TEXT NOT NULL UNIQUE,
    rp_updated_at BIGINT NOT NULL
);

CREATE INDEX idx_participant_race ON race_participant(rp_race_id);
CREATE INDEX idx_participant_key ON race_participant(rp_key);

---------------------
-- 8. POSITIONS
---------------------
CREATE TABLE race_participant_position (
    rpp_id BIGSERIAL PRIMARY KEY,
    rpp_participant_id INTEGER NOT NULL REFERENCES race_participant(rp_id) ON DELETE CASCADE,
    rpp_timestamp BIGINT NOT NULL,
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