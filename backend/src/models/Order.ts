import { Schema, model, Types } from 'mongoose';

export interface IOrder {
  user: Types.ObjectId;
  items: Array<{ menuItem: Types.ObjectId; quantity: number }>;
  status: string;
}

const orderSchema = new Schema<IOrder>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    menuItem: { type: Schema.Types.ObjectId, ref: 'MenuItem', required: true },
    quantity: { type: Number, required: true },
  }],
  status: { type: String, default: 'pending' },
}, { timestamps: true });

export const Order = model<IOrder>('Order', orderSchema);
