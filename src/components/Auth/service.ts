import Joi from 'joi';
import AuthValidation from './validation';
import UserModel, { IUserModel } from '../User/model';
import { IAuthService } from './interface';

const AuthService: IAuthService = {
	async createUser(body: IUserModel): Promise < IUserModel > {
		try {
			const validate: Joi.ValidationResult = AuthValidation.createUser(body);
			if (validate.error) {
				throw new Error(validate.error.message);
			}
			const user: IUserModel = new UserModel({
					email: body.email,
					password: body.password,
			});
			const query: IUserModel | null = await UserModel.findOne({
					email: body.email,
			});
			if (query) {
					throw new Error('This email already exists');
			}
			const saved: IUserModel = await user.save();
			return saved;
		} catch (error: any) {
				throw new Error(error);
		}
	},

	async getUser(body: IUserModel): Promise < IUserModel > {
		try {
			const validate: Joi.ValidationResult = AuthValidation.getUser(body);
			if (validate.error) {
					throw new Error(validate.error.message);
			}
			const user: IUserModel | null = await UserModel.findOne({
					email: body.email,
			});
			const isMatched: boolean | null = user && await user.comparePassword(body.password);
			if (isMatched && user) {
					return user;
			}
			throw new Error('Invalid password or email');
		} catch (error: any) {
			throw new Error(error);
		}
	},
};

export default AuthService;
