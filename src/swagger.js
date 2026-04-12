import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Rowing Map API',
            version: '1.0.0',
            description: 'Documentation de l\'API',
        },
        components: {
            schemas: {

                /* ================= USERS ================= */

                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', example: 'u1' },
                        name: { type: 'string', example: 'John Doe' },
                        email: { type: 'string', example: 'john@mail.com' }
                    }
                },

                UserInput: {
                    type: 'object',
                    required: ['name', 'email'],
                    properties: {
                        name: { type: 'string' },
                        email: { type: 'string' }
                    }
                },

                /* ================= CLUBS ================= */

                Club: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', example: 'c1' },
                        name: { type: 'string', example: 'Run Club' },
                        city: { type: 'string', example: 'Paris' }
                    }
                },

                ClubInput: {
                    type: 'object',
                    required: ['name'],
                    properties: {
                        name: { type: 'string' },
                        city: { type: 'string' }
                    }
                },

                /* ================= EVENTS ================= */

                Event: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', example: 'e1' },
                        name: { type: 'string', example: 'Marathon 2025' },
                        date: { type: 'string', format: 'date' },
                        location: { type: 'string', example: 'Paris' }
                    }
                },

                EventInput: {
                    type: 'object',
                    required: ['name', 'date'],
                    properties: {
                        name: { type: 'string' },
                        date: { type: 'string', format: 'date' },
                        location: { type: 'string' }
                    }
                },

                /* ================= TRACKS ================= */

                Track: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', example: 't1' },
                        name: { type: 'string', example: 'Parcours 10km' },
                        eventId: { type: 'string', example: 'e1' }
                    }
                },

                TrackInput: {
                    type: 'object',
                    required: ['name', 'eventId'],
                    properties: {
                        name: { type: 'string' },
                        eventId: { type: 'string' }
                    }
                },

                /* ================= RACES ================= */

                Race: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', example: 'r1' },
                        name: { type: 'string', example: 'Course 10km' },
                        eventId: { type: 'string', example: 'e1' }
                    }
                },

                RaceInput: {
                    type: 'object',
                    required: ['name', 'eventId'],
                    properties: {
                        name: { type: 'string' },
                        eventId: { type: 'string' }
                    }
                },

                /* ================= PARTICIPANTS ================= */

                Participant: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', example: 'p1' },
                        name: { type: 'string', example: 'Alice' },
                        raceId: { type: 'string', example: 'r1' }
                    }
                },

                ParticipantInput: {
                    type: 'object',
                    required: ['name', 'raceId'],
                    properties: {
                        name: { type: 'string' },
                        raceId: { type: 'string' }
                    }
                },

                /* ================= POSITIONS ================= */

                Position: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', example: 'pos1' },
                        participantId: { type: 'string', example: 'p1' },
                        latitude: { type: 'number', example: 48.8566 },
                        longitude: { type: 'number', example: 2.3522 },
                        timestamp: { type: 'string', format: 'date-time' }
                    }
                },

                PositionInput: {
                    type: 'object',
                    required: ['participantId', 'latitude', 'longitude'],
                    properties: {
                        participantId: { type: 'string' },
                        latitude: { type: 'number' },
                        longitude: { type: 'number' },
                        timestamp: { type: 'string', format: 'date-time' }
                    }
                },

                /* ================= RELATIONS AVANCÉES ================= */

                RaceWithParticipants: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        participants: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/Participant'
                            }
                        }
                    }
                },

                ParticipantWithPositions: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        positions: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/Position'
                            }
                        }
                    }
                },

                TrackWithRaces: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        races: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/Race'
                            }
                        }
                    }
                },

                EventFull: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        tracks: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/TrackWithRaces'
                            }
                        }
                    }
                }

            }
        },
        servers: [
            {
                url: '/',
            },
        ],
    },
    apis: [path.join(__dirname, './routes/*.js')],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export const swaggerDocs = (app, port) => {

    app.use(
        '/api-docs',
        swaggerUi.serve,
        swaggerUi.setup(swaggerSpec, {
            swaggerOptions: {
                url: '/api-docs.json', // 👈 force reload correct
            },
        })
    );

    console.log(`📚 Swagger disponible sur /api-docs'`);
};