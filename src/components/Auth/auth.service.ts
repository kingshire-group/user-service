import http from 'http';
import { jwt } from "../../config/services"
import { IUserModel, Profile } from "../User/user.model"
import { NextFunction, Request, Response } from 'express';

import app from '../../config/server/server';
import HttpError from '../../config/error';

export class AuthService{

	isAuthenticated(req: Request, res: Response, next: NextFunction): void {
		const token: string | string[] | undefined = req.headers['x-access-token'];
	
		if (token) {
			try {
				const user: object | string = jwt.verify(token.toString());
				req.user = user;
				return next();
			} catch (error) {
				return next(new HttpError(401, http.STATUS_CODES[401]));
			}
		}
	
		return next(new HttpError(400, 'No token provided'));
	}

	refreshToken = async (token: string, ipAddress: string) => {
		
	}

	generateRefreshToken = (user: IUserModel, ipAddress: string) => {

	}

	generateToken = (user: Profile) => 
		jwt.sign({username: user.username, role: user.role})
}
