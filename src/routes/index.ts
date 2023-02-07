import express from 'express';
import http from 'http';
import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import AuthRouter from './AuthRouter';
/* import UserRouter from './UserRouter'; */

const swaggerDef = require('../../swaggerDef');
const rootApi = '/api/v1';

export function init(app: express.Application): void {
	const router: express.Router = express.Router();

/* 	app.use(`${rootApi}/users`, jwtConfig.isAuthenticated, UserRouter); */
	app.use(`${rootApi}/auth`, AuthRouter);
	app.use(`${rootApi}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerJSDoc({
		swaggerDefinition: swaggerDef,
		apis: [path.join(__dirname, '../../documentation/**/*.yml')],
	})));
	app.get('/', (req, res) =>
		res.json({ message: 'user-service up' })
	);
	app.use((req, res) => {
		res.status(404).send(http.STATUS_CODES[404]);
	});
	app.use(router);
}
