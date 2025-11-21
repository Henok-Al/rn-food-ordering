import { Schema, model } from 'mongoose';

export interface ICoupon {
  code: string;
  discountPercentage: number;
}

const couponSchema = new Schema<ICoupon>({
  code: { type: String, required: true, unique: true },
  discountPercentage: { type: Number, required: true },
}, { timestamps: true });

export const Coupon = model<ICoupon>('Coupon', couponSchema);
