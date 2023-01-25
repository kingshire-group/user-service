import Joi from 'joi';
import Validation from '../validation';
import { IUserModel } from './model';

class UserValidation extends Validation {

	constructor() {
		super();
	}

	createUser(
		params: IUserModel,
	): Joi.ValidationResult {
		const schema: Joi.Schema = Joi.object().keys({
				name: Joi.string().required(),
				email: Joi.string().email({
						minDomainSegments: 2,
				}).required(),
		});
		return schema.validate(params);
	}

	getUser(
		body: {
				id: string
		},
	): Joi.ValidationResult {
		const schema: Joi.Schema = Joi.object().keys({
				id: this.customJoi.objectId().required(),
		});
		return schema.validate(body);
	}

	removeUser(
		body: {
			id: string
		},
	): Joi.ValidationResult {
		const schema: Joi.Schema = Joi.object().keys({
			id: this.customJoi.objectId().required(),
	});
		return schema.validate(body);
	}
}

export default new UserValidation();
