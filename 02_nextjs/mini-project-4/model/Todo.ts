import { PriorityEnum } from "@/validations/todo";
import mongoose, { Document, Schema } from "mongoose";



export interface Todo extends Document {
  title: string;
  description: string;
  completed: boolean;
  priority: PriorityEnum;
  createdAt: Date;
  updatedAt: Date;
}

const todoSchema: Schema<Todo> = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
    priority: {
      type: String,
      required: true,
      enum: Object.values(PriorityEnum),
      default: PriorityEnum.LOW,
    },
  },
  {
    timestamps: true,
  }
);

const TodoModel =
  (mongoose.models.Todo as mongoose.Model<Todo>) ||
  mongoose.model<Todo>("Todo", todoSchema);

export default TodoModel;
