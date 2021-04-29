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
    tagContents: {
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
        default: () => Math.floor(+new Date() / 1000),
    },

    // 대표태그 여부
    representativeTag: {
        type: Boolean,
        reuired: true,
    },

    // 컬러
    color: {
        type: String,
    },


    // 삭제 여부
    whetherDeleteTag: {
        type: Boolean,
        default: false,
    },

    // 삭제 메세지
    deleteTagMessage: {
        type: String,
        default: '',
    }


})
// interface 관련 정보 참조: https://jaeyeophan.github.io/2017/12/28/TS-4-Interface-in-TypeScript/
// Tag 객체 틀 만들어주기
export interface UserTag extends Document {
    userId: string;
    tagId: string;
    tagContents: string;
    createdTimestamp: number;
    updatedTimestamp: number;
    representativeTag: boolean;
    whetherDeleteTag: boolean;
    color: string;
    deleteTagMessage: string;
}

export const userTags: Model<UserTag> = model('userTag', tagSchema);