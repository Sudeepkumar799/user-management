import { InferSchemaType, Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

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
      select: false,
    },
    mobileNumber: {
      type: Number || null,
      default: null,
    },
    role: {
      type: Number,
      enum: [0, 1, 2],
      default: 2,
    },
  },
  { timestamps: true }
).pre("save", async function (next) {
  if (this.isModified("password") && typeof this.password === "string") {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);
