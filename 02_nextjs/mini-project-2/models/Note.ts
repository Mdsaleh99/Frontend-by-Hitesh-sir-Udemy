import mongoose, { Document, Schema } from "mongoose";

export interface Note extends Document {
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema: Schema<Note> = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
})

const NoteModel = (mongoose.models.Note as mongoose.Model<Note>) || mongoose.model<Note>('Note', noteSchema)

export default NoteModel;