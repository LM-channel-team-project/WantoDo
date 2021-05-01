import { Document, model, Model, Schema } from 'mongoose';

// 태그 스키마 작성, by 현빈, 21/04/29  
const tagSchema = new Schema({

    // 유저식별을 위해 유저 아이디 받기
    userId: {
        type: String,
        ruquired: true,
    },

    // 태그 식별용 아이디
    tagId: {
        type: String,
        required: true,
    },

    // 태그 내용
    name: {
        type: String,
        required: true
    },
    // 생성 시간
    createdTimestamp: {
        type: Number,
        default: () => Math.floor(+new Date() / 1000),
    },

    // 업데이트 시간
    updatedTimestamp: {
        type: Number,
        default: 0,
    },


    // 컬러
    color: {
        type: String,
    },


    // 삭제 여부
    isDeleted: {
        type: Boolean,
        default: false,
    },


})
// interface 관련 정보 참조: https://jaeyeophan.github.io/2017/12/28/TS-4-Interface-in-TypeScript/
// Tag 객체 틀 만들어주기
export interface Tag extends Document {
    userId: string;
    tagId: string;
    name: string;
    createdTimestamp: number;
    updatedTimestamp: number;
    isDeleted: boolean;
    color: string;
}

export const Tags: Model<Tag> = model('Tag', tagSchema);