import { model, Schema } from "mongoose";

interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  company: { name: string };
  address: { city: string };
}

const userSchema = new Schema<IUser>({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  company: {
    name: String,
  },
  address: {
    city: String,
  },
});

export const User = model<IUser>("User", userSchema);
