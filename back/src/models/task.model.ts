import { model, Schema, Document, Model } from "mongoose";

const alarmSchema = new Schema({
    type: {
        type: String,
        enum: [
            'relative',
            'absolute',
        ]
    },
    subType:{
        type: String,
        enum: [
            'min',
            'hour',
            'day',
            'week',
            'month',
            'year',
        ],
    },
    time: {
        type: Number,
    }
});

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
    checkedFlag: {
        type: Boolean,
        required: true,
    },
    period: {
        start: Number,
        end: Number,
    },
    important: {
        type: Number,
    },
    tags: [{
        tag: String,
        color: String,
    }],
    repeat: {
        interval: Number,
        datOfWeek: [Number],
        time: Number,
    },
    alarm: alarmSchema,
    createdTimestamp: {
        type: Number,
        default: () => Math.floor(+new Date()),
    },
    updatedTimestamp: {
        type: Number,
        default: 0
    }
});

export interface ITask extends Document {

}

export const tasks: Model<any> = model('Task', taskSchema);
