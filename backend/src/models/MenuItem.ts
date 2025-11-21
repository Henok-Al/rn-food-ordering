import { Schema, model } from 'mongoose';

export interface IMenuItem {
  name: string;
  description: string;
  price: number;
  category: string;
}

const menuItemSchema = new Schema<IMenuItem>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
}, { timestamps: true });

export const MenuItem = model<IMenuItem>('MenuItem', menuItemSchema);
