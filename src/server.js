import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import usersRoutes from './routes/users.js';
import eventsRoutes from './routes/events.js';
import tracksRoutes from './routes/tracks.js';
import racesRoutes from './routes/races.js';
import participantsRoutes from './routes/participants.js';
import positionsRoutes from './routes/positions.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', usersRoutes);
app.use('/events', eventsRoutes);
app.use('/tracks', tracksRoutes);
app.use('/races', racesRoutes);
app.use('/participants', participantsRoutes);
app.use('/positions', positionsRoutes);

app.get('/', (req, res) => {
    res.send('API running 🚀');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});