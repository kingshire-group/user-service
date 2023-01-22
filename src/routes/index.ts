import express from 'express';
import http from 'http';
import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import * as jwtConfig from '../config/middleware/jwtAuth';
import AuthRouter from './AuthRouter';
import UserRouter from './UserRouter';

const swaggerDef = require('../../swaggerDef');
export function init(app: express.Application): void {
    const router: express.Router = express.Router();

    app.use('/v1/users', jwtConfig.isAuthenticated, UserRouter);
    app.use('/auth', AuthRouter);
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc({
        swaggerDefinition: swaggerDef,
        apis: [path.join(__dirname, '../../documentation/**/*.yml')],
    })));
    app.use((req, res) => {
        res.status(404).send(http.STATUS_CODES[404]);
    });
    app.use(router);
}
