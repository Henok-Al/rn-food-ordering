import { Schema, model, Types } from 'mongoose';

export interface IPayment {
  order: Types.ObjectId;
  amount: number;
  status: string;
}

const paymentSchema = new Schema<IPayment>({
  order: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: 'pending' },
}, { timestamps: true });

export const Payment = model<IPayment>('Payment', paymentSchema);
