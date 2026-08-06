import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUIExpress from 'swagger-ui-express';
import dotenv from 'dotenv';
const isTest = process.env.NODE_ENV === 'test';
dotenv.config();
if (isTest) process.env.NODE_ENV = 'test';
mongoose.set('bufferCommands', false);

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Swagger Configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'AdopMe API - Backend III',
            description: 'API RESTful para la gestión de adopciones de mascotas y administración de usuarios.',
            version: '1.0.0'
        }
    },
    apis: ['./src/docs/**/*.yaml']
};

const specs = swaggerJSDoc(swaggerOptions);
app.use('/api/docs', swaggerUIExpress.serve, swaggerUIExpress.setup(specs));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Sanitize URLs to trim trailing newlines or %0A accidentally copied into Postman
app.use((req, res, next) => {
    if (req.url) {
        req.url = req.url.replace(/(%0A|%0D|\r|\n|\s)+$/g, '');
    }
    next();
});

// Routers
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);

// Database Connection & Server Listener (Skip during automated tests)
const isMochaRunning = process.argv.some(arg => String(arg).includes('mocha'));
if (process.env.NODE_ENV !== 'test' && !isMochaRunning) {
    app.listen(PORT, () => console.log(`Servidor ejecutandose en el puerto ${PORT}`));
    
    const MONGO_URI = process.env.DATABASE || 'mongodb://localhost:27017/adopme';
    mongoose.connect(MONGO_URI)
        .then(() => {
            console.log('Base de datos MongoDB conectada exitosamente');
        })
        .catch((error) => {
            console.warn('No se detecto una instancia local de MongoDB en puerto 27017. El servidor continuara funcionando.');
        });
}

export default app;
