import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Rowing Map API',
            version: '1.0.0',
            description: 'Documentation de l\'API',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export const swaggerDocs = (app, port) => {
    // URL dynamique
    swaggerSpec.servers = [
        {
            url: `http://localhost:${port}`,
        },
    ];

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    console.log(swaggerSpec.paths);

    console.log(`📚 Swagger disponible sur http://localhost:${port}/api-docs`);
};