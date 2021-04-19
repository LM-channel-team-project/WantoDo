import { Document, model, Model, Schema } from "mongoose";

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
  checkedFlag: {
    // task 수행여부
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
  tags: [
    {
      tag: String,
      color: String,
    },
  ],
  repeat: {
    interval: Number,
    datOfWeek: [Number],
    time: Number,
  },
  alarm: {
    type: {
      type: String,
      enum: ["relative", "absolute"],
    },
    subType: {
      type: String,
      enum: ["min", "hour", "day", "week", "month", "year"],
    },
    time: {
      type: Number,
    },
  },
  createdTimestamp: {
    type: Number,
    default: () => Math.floor(+new Date()),
  },
  updatedTimestamp: {
    type: Number,
    default: 0,
  },
});

type IType = "relative" | "absolute";
type ISubType = "min" | "hour" | "day" | "week" | "month" | "year";

export interface IAlarm {
  type: IType;
  subType: ISubType;
  time: number;
}

export interface ITask extends Document {
  userId: string;
  taskId: string;
  contents: string;
  checkedFlag: boolean;
  period: {
    start: number;
    end: number;
  };
  important: number;
  tags: [
    {
      tag: string;
      color: string;
    }
  ];
  repeat: {
    interval: number;
    datOfWeek: [number];
    time: number;
  };
  alarm: IAlarm;
  createdTimestamp: number;
  updatedTimestamp: number;
}

export const tasks: Model<any> = model("Task", taskSchema);
