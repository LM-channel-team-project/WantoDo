import { model, Schema, Document, Model } from "mongoose";

const settingSchema = new Schema({
    theme: {
        type: String,
        enum: [
            'default',
            'dark',
        ],
    },
    notificationFlag: {
        type: Boolean,
    },
    beginningOfWeek: {
        type: String,
        enum: [
            'sunday',
            'monday',
        ],
    }
});

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
        enum: [
            'google',
            'kakao',
            'facebook',
            'apple',
            'naver',
        ],
    },
    name: {
        type: String,
        required: true,
    },
    motto: {
        type: String,
    },
    profileImageUrl: {
        type: String,
    },
    settings: settingSchema,
});

type theme = 'default' | 'dark';
type beginningOfWeek = 'monday' | 'sunday';

interface ISetting {
    theme: theme;
    notificationFlag: boolean;
    beginningOfWeek: beginningOfWeek;
}

export interface IUser extends Document{
    userId: string;
    email: string;
    platform: string;
    name: string;
    motto: string;
    profileImageUrl: string;
    settings: ISetting
}

export const users: Model<IUser> = model('User', userSchema);