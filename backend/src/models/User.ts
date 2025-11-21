import { Schema, model, Document } from 'mongoose';

export type Address = {
  label?: string;
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  postalCode?: string;
  country?: string;
};

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  role: 'customer' | 'admin' | 'courier';
  addresses: Address[];
  refreshTokens: string[];
  createdAt: Date;
  updatedAt: Date;
}

const addressSchema = new Schema<Address>(
  {
    label: { type: String },
    line1: { type: String, required: true },
    line2: { type: String },
    city: { type: String, required: true },
    state: { type: String },
    postalCode: { type: String },
    country: { type: String },
  },
  { _id: false },
);

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['customer', 'admin', 'courier'], default: 'customer' },
    addresses: { type: [addressSchema], default: [] },
    refreshTokens: { type: [String], default: [] },
  },
  { timestamps: true },
);

export const User = model<IUser>('User', userSchema);
