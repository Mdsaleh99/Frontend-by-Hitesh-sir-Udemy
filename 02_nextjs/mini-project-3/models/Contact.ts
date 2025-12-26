import mongoose, { Document, Schema } from "mongoose";

export enum StatusEnum {
  NEW = "new",
  READ = "read",
  REPLIED = "replied",
}

export interface Contact extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  status: StatusEnum;
  createdAt: Date;
  updatedAt: Date;
}

const contactSchema: Schema<Contact> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(StatusEnum),
      default: StatusEnum.NEW,
    },
  },
  {
    timestamps: true,
  }
);

const ContactModel =
  (mongoose.models.Contact as mongoose.Model<Contact>) ||
  mongoose.model<Contact>("Contact", contactSchema);

export default ContactModel;
