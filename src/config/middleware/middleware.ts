import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import passport from 'passport'
import { HttpError } from '../error/index'
import { sendHttpErrorModule } from '../error/sendHttpError'

declare global{
	namespace Express {
		interface Response {
		sendHttpError: (error: HttpError | Error, message ? : string) => void;
		}
	}	
}

export function configure(app: express.Application): void {
	require('../services/passport')
	app.use(bodyParser.urlencoded({
		extended: false,
	}))
	app.use(bodyParser.json())
	app.use(cookieParser())
	app.use(compression())
	app.use(helmet())
	app.use(cors())
	app.use(passport.initialize())

	app.use(sendHttpErrorModule)

	app.use((req, res, next) => {
		res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS ');
		res.header(
			'Access-Control-Allow-Headers',
			'Origin, X-Requested-With,'
			+ ' Content-Type, Accept,'
			+ ' Authorization,'
			+ ' Access-Control-Allow-Credentials',
		);
		res.header('Access-Control-Allow-Credentials', 'true');
		next()
	})
}

export function initErrorHandler(app: express.Application): void {
	app.use((error: Error, req: express.Request, res: express.Response) => {
		if (typeof error === 'number') {
			error = new HttpError(error); // next(404)
		}

		if (error instanceof HttpError) {
			res.sendHttpError(error)
		} else if (app.get('env') === 'development') {
			error = new HttpError(500, error.message);
			res.sendHttpError(error)
		} else {
			error = new HttpError(500)
			res.sendHttpError(error, error.message)
		}

		console.error(error)
	});
}
