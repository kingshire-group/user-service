import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import http from 'http';
import app from '../server/server';
import HttpError from '../error';

declare global {
	namespace Express {
	  interface Request {
		user: object | string;
	  }
	}
 }

export function isAuthenticated(req: Request, res: Response, next: NextFunction): void {
    const token: string | string[] | undefined = req.headers['x-access-token'];

    if (token) {
        try {
            const user: object | string = jwt.verify(token.toString(), app.get('secret'));
            req.user = user;
            return next();
        } catch (error) {
            return next(new HttpError(401, http.STATUS_CODES[401]));
        }
    }

    return next(new HttpError(400, 'No token provided'));
}
