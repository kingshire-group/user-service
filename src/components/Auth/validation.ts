import Joi from 'joi';
import Validation from '../validation';
import { IUserModel } from '../User/model';

class AuthValidation extends Validation {

	constructor() {
		super();
	}

	createUser(
		params: IUserModel,
	): Joi.ValidationResult {
		const schema: Joi.Schema = Joi.object().keys({
				password: Joi.string().required(),
				email: Joi.string().email({
						minDomainSegments: 2,
				}).required(),
		});

		return schema.validate(params);
	}
	
	getUser(
		params: IUserModel,
	): Joi.ValidationResult {
		const schema: Joi.Schema = Joi.object().keys({
				response_type: Joi.string(),
				state: Joi.string(),
				client_id: Joi.string(),
				password: Joi.string().required(),
				email: Joi.string().email({
						minDomainSegments: 2,
				}).required(),
		});

		return schema.validate(params);
	}
}

export default new AuthValidation();
