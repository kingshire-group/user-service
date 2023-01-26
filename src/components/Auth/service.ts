import { jwt } from "../../config/services"
import { IUserModel, Profile } from "../User/model"

export class AuthService{

	refreshToken = async (token: string, ipAddress: string) => {
		
	}

	generateRefreshToken = (user: IUserModel, ipAddress: string) => {

	}

	generateToken = (user: IUserModel) => 
		jwt.sign({uid: user._id, role: user.profile.role})
}

/* import Joi from 'joi';
import AuthValidation from './validation';
import UserModel, { IUserModel, Profile } from '../User/model';
import { IAuthService } from './interface';

const AuthService: IAuthService = {
	async createUser(body: Profile): Promise < Profile > {
		* try {
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
			return saved.profile;
		} catch (error: any) {
				throw new Error(error);
		} *
	},

	async getUser(body: IUserModel): Promise < IUserModel > {
		try {
			const validate: Joi.ValidationResult = AuthValidation.getUser(body);
			if (validate.error) {
					throw new Error(validate.error.message);
			}
			const user: IUserModel | null = await UserModel.findOne({
					email: body.profile.email,
			});
			const isMatched: boolean | null = user && await user.comparePassword(body.profile.password);
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
 */