import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { Document, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import * as connections from '../../config/connection/connection';

enum ROLES {
  ADMIN = 'admin',
  KINGLANCER = 'kinglancer',
  CLIENT = 'client',
}

export interface IUserModel extends Document {
	username: string
	fullname: string
	email: string
	role: string
	description: string
	services: Services[]
	skills: Skills[]
	password: string
	passwordResetToken: string
	passwordResetExpires: Date
	google: string
	token: AuthToken
	profile: {
		name: string,
		gender: string,
		picture: string,
	}
	comparePassword: (password: string) => Promise < boolean > 
	gravatar: (size: number) => string
}

export type AuthToken = {
	accessToken?: string,
	kind: string,
	refreshToken?: string
}

export type Services = {
	service: string
	price: string
	currency: string
	servicePackage: string
}

export type Skills = {
	title: string
}

const UserSchema: Schema = new Schema({
	fullName: {
		type: String,
		trim: true
	},
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	email: {
		type: String,
		unique: true,
		trim: true,
	},
	role: {
		type: String,
		enum: Object.values(ROLES),
		default: ROLES.CLIENT
	},
	password: {
		type: String,
		minlength: 6
	},
	auth: {
		google: {
			id: String,
			token: String
		}
	},
	services: Array,
	description: String,
	skills: Array,
	profilePicture: String,
	averageRating: Number,
	passwordResetToken: String,
	passwordResetExpires: Date,
}, {
	collection: 'usermodel',
	versionKey: true,
	timestamps: true
});

UserSchema.pre('save', async function (next): Promise < void > {
	const user: IUserModel = this; // tslint:disable-line
	if (!user.isModified('password')) {
		return next();
	}

	try {
		const salt: string = await bcrypt.genSalt(10);
		const hash: string = await bcrypt.hash(user.password, salt);
		user.password = hash;
		next();
	} catch (error: any) {
		return next(error);
	}
});

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise < boolean > {
	try {
		const match: boolean = await bcrypt.compare(candidatePassword, this.password);
		return match;
	} catch (error: any) {
		return error;
	}
};

UserSchema.methods.gravatar = function (size: number): string {
	if (!size) {
		size = 200;
	}
	if (!this.email) {
		return `https://gravatar.com/avatar/?s=${size}&d=retro`;
	}
	const md5: string = crypto.createHash('md5').update(this.email).digest('hex');
	return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

UserSchema.plugin(mongoosePaginate);
UserSchema.plugin(mongooseUniqueValidator);

export default connections.db.model< IUserModel >('UserModel', UserSchema);
