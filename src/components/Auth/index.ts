import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import app from '../../config/server/server';
import AuthService from './service';
import HttpError from '../../config/error';
import { IUserModel } from '../User/model';

export async function signup(req: Request, res: Response, next: NextFunction): Promise < void > {
	try {
		const user: IUserModel = await AuthService.createUser(req.body);
		const token: string = jwt.sign({ email: user.email }, app.get('secret'), {
			expiresIn: '60m',
		});
		res.json({
			status: 200,
			logged: true,
			token,
			message: 'Sign in successfull',
		});
	} catch (error: any) {
			if (error.code === 500) {
				return next(new HttpError(error.message.status, error.message));
			}
			res.json({
				status: 400,
				message: error.message,
			});
	}
}

export async function login(req: Request, res: Response, next: NextFunction): Promise < void > {
	try {
		const user: IUserModel = await AuthService.getUser(req.body);

		const token: string = jwt.sign({ email: user.email }, app.get('secret'), {
			expiresIn: '60m',
		});
		res.json({
			status: 200,
			logged: true,
			token,
			message: 'Sign in successfull',
		});
	} catch (error: any) {
			if (error.code === 500) {
				return next(new HttpError(error.message.status, error.message));
			}
			res.json({
				status: 400,
				message: error.message,
			});
	}
}
