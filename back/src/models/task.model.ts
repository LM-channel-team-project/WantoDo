import { Document, model, Model, Schema } from 'mongoose';

//  Created by 강성모(castleMo) on 2021/04/11
const taskSchema = new Schema({
	userId: {
		type: String,
		required: true,
	},
	taskId: {
		type: String,
		required: true,
	},
	contents: {
		type: String,
		required: true,
	},
	// task 수행여부
	isChecked: {
		type: Boolean,
		default: false,
	},
	period: {
		start: {
			type: Number,
			default: 0,
		},
		end: {
			type: Number,
			default: 0,
		},
	},
	important: {
		type: Number,
		default: 0,
	},
	tags: {
		type: [String],
		default: [],
	},
	// repeat: {
	// 	interval: Number,
	// 	dayOfWeek: [Number],
	// 	time: Number,
	// },
	// alarm: {
	// 	type: {
	// 		type: String,
	// 		enum: ['relative', 'absolute'],
	// 	},
	// 	subType: {
	// 		type: String,
	// 		enum: ['min', 'hour', 'day', 'week', 'month', 'year'],
	// 	},
	// 	time: {
	// 		type: Number,
	// 	},
	// },
	createdTimestamp: {
		type: Number,
		default: () => Math.floor(+new Date()),
	},
	updatedTimestamp: {
		type: Number,
		default: 0,
	},
	isDeleted: {
		type: Boolean,
		default: false,
	},
});

type IType = 'relative' | 'absolute';
type ISubType = 'min' | 'hour' | 'day' | 'week' | 'month' | 'year';

export interface IAlarm {
	type: IType;
	subType: ISubType;
	time: number;
}

export interface ITaskDocument extends Document {
	userId: string;
	taskId: string;
	contents: string;
	isChecked: boolean;
	period: {
		start: number;
		end: number;
	};
	important: number;
	tags: string[];
	repeat: {
		interval: number;
		datOfWeek: [number];
		time: number;
	};
	alarm: IAlarm;
	createdTimestamp: number;
	updatedTimestamp: number;
	isDeleted: boolean;
}

export const tasks: Model<ITaskDocument> = model('Task', taskSchema);
