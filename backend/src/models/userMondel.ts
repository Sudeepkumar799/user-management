import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name."],
    },
    emailId: {
      type: String,
      required: [true, "Please enter your emailId."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password."],
      minLength: [8, "Password should contain minimun of 8 characters"],
    },
    mobileNumber: {
      type: Number,
      default: null,
    },
    role: {
      type: Number,
      enum: [0, 1, 2],
      default: 2,
    },
  },
  { timestamps: true }
);

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);
