import { IUserModel } from '../User/model';

export interface IAuthService {
	createUser(userModel: IUserModel): Promise < IUserModel >
	getUser(userModel: IUserModel): Promise < IUserModel >
}
