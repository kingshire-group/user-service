import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { Document, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import * as connections from '../../config/connection/connection';
import Logger from '../../config/services/logger';

enum ROLES {
  ADMIN = 'admin',
  KINGLANCER = 'kinglancer',
  CLIENT = 'client',
}

export interface IUserModel extends Document {
	profile: Profile
	services: Services[]
	skills: Skills[]
	passwordResetToken: string
	passwordResetExpires: Date
	google_id: string
	token: AuthToken
	comparePassword: (password: string) => Promise < boolean > 
	gravatar: (size: number) => string
}

export type Profile = {
	username: string
	fullname: string
	email: string
	role: string
	password: string
	profile_picture: string
	description: string
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
	profile: {
		fullName: {
			type: String,
			trim: true
		},
		username: {
			type: String,
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
		isKinglancer: {
			type: Boolean,
			default: false
		},
		description: String,
		profilePicture: String,
		averageRating: Number,
	},
	google: String,
	services: Array,
	skills: Array,
	passwordResetToken: String,
	passwordResetExpires: Date,
}, {
	collection: 'usermodel',
	versionKey: false,
	timestamps: true
});

UserSchema.pre('save', async function (next): Promise < void > {
	const user: IUserModel = this;
	if (!user.isModified('profile.password')) {
		return next();
	}

	try {
		if (user.profile.password){const salt: string = await bcrypt.genSalt(10);
			const hash: string = await bcrypt.hash(user.profile.password, salt);
			user.profile.password = hash;
			next();
		} else{
			throw new Error('Password Not Found!')
		}
	} catch (error: any) {
		return next(error);
	}
});

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise < boolean > {
	try {
		const match: boolean = await bcrypt.compare(candidatePassword, this.profile.password)
		return match
	} catch (error: any) {
		return error
	}
}

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
