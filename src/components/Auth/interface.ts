import { IUserModel, Profile } from '../User/model';

export interface IAuthService {
	createUser(userModel: Profile): Promise < Profile >
	getUser(userModel: IUserModel): Promise < IUserModel >
}
