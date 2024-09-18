// backend/src/models/Order.ts
import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User';

export interface IOrderItem {
  product: mongoose.Schema.Types.ObjectId;
  name: string;
  qty: number;
  price: number;
}

export interface IOrder extends Document {
  user: IUser['_id'];
  orderItems: IOrderItem[];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentResult: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };
  totalPrice: number;
  isPaid: boolean;
  paidAt: Date;
  isDelivered: boolean;
  deliveredAt: Date;
}

const orderSchema: Schema<IOrder> = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      name: { type: String, required: true },
      qty: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  paymentMethod: { type: String, required: true },
  paymentResult: {
    id: { type: String },
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String },
  },
  totalPrice: { type: Number, required: true },
  isPaid: { type: Boolean, required: true, default: false },
  paidAt: { type: Date },
  isDelivered: { type: Boolean, required: true, default: false },
  deliveredAt: { type: Date },
});

const Order = mongoose.model<IOrder>('Order', orderSchema);
export default Order;
