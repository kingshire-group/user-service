import Joi from 'joi';
import { Types } from 'mongoose';
import UserModel, { IUserModel } from './model';
import UserValidation from './validation';
import { IUserService } from './interface';

const UserService: IUserService = {
	async findAll(): Promise < IUserModel[] > {
		try {
			return await UserModel.find({});
		} catch (error: any) {
			throw new Error(error.message);
		}
	},

	async findOne(id: string): Promise < IUserModel > {
		try {
			const validate: Joi.ValidationResult = UserValidation.getUser({
				id,
			});
			if (validate.error) {
				throw new Error(validate.error.message);
			}
			return await UserModel.findOne({
				_id: new Types.ObjectId(id),
			}) as any;
		} catch (error: any) {
			throw new Error(error.message);
		}
	},

	async insert(body: IUserModel): Promise < IUserModel > {
		try {
			const validate: Joi.ValidationResult = UserValidation.createUser(body);
			if (validate.error) {
				throw new Error(validate.error.message);
			}
			const user: IUserModel = await UserModel.create(body);
			return user;
		} catch (error: any) {
			throw new Error(error.message);
		}
	},

	async remove(id: string): Promise < IUserModel > {
		try {
			const validate: Joi.ValidationResult = UserValidation.removeUser({
				id,
			});
			if (validate.error) {
				throw new Error(validate.error.message);
			}
			const user: IUserModel | null= await UserModel.findOneAndRemove({
				_id: new Types.ObjectId(id),
			});
			return user as any;
		} catch (error: any) {
			throw new Error(error.message);
		}
	},
};

export default UserService;
