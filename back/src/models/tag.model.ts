import { Document, model, Model, Schema } from 'mongoose';

/**
 * @author 현빈
 * @since 21/04/29
 * @description 태그 스키마 작성
 */
const tagSchema = new Schema({
	// 유저식별을 위해 유저 아이디 받기
	userId: {
		type: String,
		required: true,
	},
	// 태그 식별용 아이디
	tagId: {
		type: String,
		required: true,
	},
	// 태그 이름
	name: {
		type: String,
		required: true,
	},
	// 태그 컬러
	color: {
		type: String,
	},
	createdTimestamp: {
		type: Number,
		default: () => Math.floor(+new Date()),
	},
	updatedTimestamp: {
		type: Number,
		default: 0,
	},
	// 삭제 여부
	isDeleted: {
		type: Boolean,
		default: false,
	},
});

// interface 관련 정보 참조: https://jaeyeophan.github.io/2017/12/28/TS-4-Interface-in-TypeScript/
// Tag 객체 틀 만들어주기
export interface ITagDocument extends Document {
	userId: string;
	tagId: string;
	name: string;
	createdTimestamp: number;
	updatedTimestamp: number;
	isDeleted: boolean;
	color: string;
}

export const tags: Model<ITagDocument> = model('Tag', tagSchema);
