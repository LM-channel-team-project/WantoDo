import { Document, model, Model, Schema } from 'mongoose';

const userSchema = new Schema({
	userId: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	platform: {
		type: String,
		required: true,
		enum: ['google'],
	},
	platformId: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	nickname: {
		type: String,
		default: '',
	},
	motto: {
		type: String,
		default: '',
	},
	profileImageUrl: {
		type: String,
	},
	closeAccountFlag: {
		type: Boolean,
		default: false,
	},
	closeAccountMessage: {
		type: String,
		default: '',
	},
	createdTimestamp: {
		type: Number,
		default: () => Math.floor(+new Date()),
	},
	updatedTimestamp: {
		type: Number,
		default: 0,
	},
	settings: {
		theme: {
			type: String,
			default: 'default',
			enum: ['default', 'dark'],
		},
		notificationFlag: {
			type: Boolean,
			default: false,
		},
		beginningOfWeek: {
			type: String,
			default: 'sunday',
			enum: ['sunday', 'monday'],
		},
	},
	notifications: [
		{
			endpoint: String,
			expirationTime: Number,
			keys: {
				p256dh: String,
				auth: String,
			},
		},
	],
});

export type Theme = 'default' | 'dark';
export type BeginningOfWeek = 'monday' | 'sunday';

interface ISetting {
	theme: Theme | undefined;
	notificationFlag: boolean | undefined;
	beginningOfWeek: BeginningOfWeek | undefined;
}

interface INotification {
	endpoint: string;
	expirationTime: number;
	keys: {
		p256dh: string;
		auth: string;
	};
}

export interface IUser extends Document {
	userId: string;
	email: string;
	platform: string;
	platformId: string;
	name: string;
	nickname: string;
	motto: string;
	profileImageUrl: string;
	createdTimestamp: number;
	updatedTimestamp: number;
	closeAccountFlag: boolean; // 회원탈퇴 여부
	closeAccountMessage: string; // 회원탈퇴 메시지
	notifications: [INotification];
	settings: ISetting;
}

export const users: Model<IUser> = model('User', userSchema);
