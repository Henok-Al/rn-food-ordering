import { Schema, model } from 'mongoose';

export interface IRestaurant {
  name: string;
  cuisine: string[];
  address: string;
}

const restaurantSchema = new Schema<IRestaurant>({
  name: { type: String, required: true },
  cuisine: [{ type: String, required: true }],
  address: { type: String, required: true },
}, { timestamps: true });

export const Restaurant = model<IRestaurant>('Restaurant', restaurantSchema);
