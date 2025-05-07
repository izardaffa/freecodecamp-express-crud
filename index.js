import express from 'express';
import bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import userRouter from './routes/users.js';

const app = express();
const PORT = 5000;

// Swagger Config
const swaggerOptions = {
    swaggerDefinition: {
        myapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'CRUD User',
            license: {
                name: 'MIT',
                url: 'https://opensource.org/licenses/MIT',
            }
        },
        servers: [
            {
                url: 'http://localhost:5000',
            },
        ],
        tags: [
            {
                name: 'Users',
                description: 'User CRUD API',
            },
        ]
    },
    apis: ['./routes/*.js'],
}

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log('[GET ROUTE]');
    res.send('HELLO FROM HOMEPAGE');
});

app.use('/users', userRouter);

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
