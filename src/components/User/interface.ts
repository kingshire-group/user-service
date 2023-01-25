import { IUserModel } from './model';


export interface IUserService {
	findAll(): Promise<IUserModel[]>;
	findOne(code: string): Promise<IUserModel>;
	insert(userModel: IUserModel): Promise<IUserModel>;
	remove(id: string): Promise<IUserModel>;
}
