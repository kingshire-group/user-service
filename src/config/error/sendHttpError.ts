import { NextFunction, Request } from 'express';
import express from 'express';
import { HttpError } from './index';

 declare global {
	namespace Express {
	  interface Response {
		sendHttpError: (error: HttpError | Error, message ? : string) => void;
	  }
	}
 }

const generateHTML: Function = (error: HttpError): string => {
	if (error) {
		return '<div style=\'text-align: center;\'>'
			+ `<p>Status: ${error.status}</p>`
			+ `<p>Name: ${error.name}</p>`
			+ `<p>${error}</p>`
		+ '</div>';
	}

	return '';
};

export function sendHttpErrorModule(req: Request, res:express.Response, next: NextFunction): void {
	res.sendHttpError = (error: any) => {
		res.status(error.status);
		
		if (
			req.xhr
			|| req.is('json')
			|| (req.is('json') && req.get('Accept'))
			|| !(req.get('Accept') && req.get('Accept')?.indexOf('html') !== -1)
		) {
			res.json({
					status: error.status,
					name: error.name,
					message: error.message,
			});
		} else {
			res.send(generateHTML(error));
		}
	};

	next();
}
