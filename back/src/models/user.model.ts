import { model, Schema, Document, Model } from "mongoose";

const settingSchema = new Schema({
    theme: {
        type: String,
        default: 'default',
        enum: [
            'default',
            'dark',
        ],
    },
    notificationFlag: {
        type: Boolean,
        default: false,
    },
    beginningOfWeek: {
        type: String,
        default: 'sunday',
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
        ],
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
    platformId: string;
    name: string;
    nickname: string;
    motto: string;
    profileImageUrl: string;
    closeAccountFlag: boolean;                  // 회원탈퇴 여부
    closeAccountMessage: string;                // 회원탈퇴 메시지
    settings: ISetting;
}

export const users: Model<IUser> = model('User', userSchema);