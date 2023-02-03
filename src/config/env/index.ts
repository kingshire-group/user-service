import dotenv from 'dotenv';

dotenv.config();

const port = 8000

interface IConfig {
	port: string | number;
	database: {
		MONGODB_URI: string;
		MONGODB_DB_MAIN: string;
	};
	secret: string;
	auth: IAuth
}

interface IAuth{
	google: IGoogleAuth
	jwt: IJWT
}

interface IGoogleAuth{
	clientID: string
	clientSecret: string
	callbackURL: string
}

interface IJWT{
	secret: string
	expiryTime: string
}

const NODE_ENV: string = process.env.NODE_ENV || 'development';

const development: IConfig = {
	port: process.env.PORT || port,
	database: {
		MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/',
		MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN || 'users_db',
	},
	secret: process.env.SECRET || '@QEGTUI',
	auth: {
		google: {
			clientID: process.env.GOOGLE_CLIENT_ID || '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
			callbackURL: process.env.GOOGLE_CALLBACK_URL || ''
		},
		jwt: {
			secret: process.env.JWT_SECRET || '',
			expiryTime: process.env.JWT_EXPIRATION || ''
		}
	}
};

const production: IConfig = {
	port: process.env.PORT || port,
	database: {
		MONGODB_URI: process.env.MONGODB_URI || 'mongodb://production_uri/',
		MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN || 'users_db',
	},
	secret: process.env.SECRET || '@QEGTUI',
	auth: {
		google: {
			clientID: process.env.GOOGLE_CLIENT_ID || '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
			callbackURL: process.env.GOOGLE_CALLBACK_URL || ''
		},
		jwt: {
			secret: process.env.JWT_SECRET || '',
			expiryTime: process.env.JWT_EXPIRATION || ''
		}
	}
};

const test: IConfig = {
	port: process.env.PORT || port,
	database: {
		MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017',
		MONGODB_DB_MAIN: 'test_users_db',
	},
	secret: process.env.SECRET || '@QEGTUI',
	auth: {
		google: {
			clientID: process.env.GOOGLE_CLIENT_ID || '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
			callbackURL: process.env.GOOGLE_CALLBACK_URL || ''
		},
		jwt: {
			secret: process.env.JWT_SECRET || '',
			expiryTime: process.env.JWT_EXPIRATION || ''
		}
	}
};

const config: {
	[name: string]: IConfig
} = {
	test,
	development,
	production,
};

export default config[NODE_ENV];
