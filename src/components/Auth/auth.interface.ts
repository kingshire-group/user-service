import { IUserModel, Profile } from '../User/user.model';

export interface IAuthService {
	createUser(userModel: Profile): Promise < Profile >
	getUser(userModel: IUserModel): Promise < IUserModel >
}

export interface IUsernameCreation{
	email: string
	username: string
}

export interface IUserAuthenticate{
	email: string
	password: string
}