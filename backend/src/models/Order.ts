import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  restaurantId: mongoose.Types.ObjectId;
  deliveryPartnerId?: mongoose.Types.ObjectId;
  items: {
    menuItemId: mongoose.Types.ObjectId;
    name: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  deliveryFee: number;
  status: 'Preparing' | 'Picked' | 'On the way' | 'Delivered';
  deliveryAddress: string;
}

const OrderItemSchema = new Schema({
  menuItemId: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const OrderSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  deliveryPartnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryPartner' },
  items: [OrderItemSchema],
  totalAmount: { type: Number, required: true },
  deliveryFee: { type: Number, required: true },
  status: { type: String, enum: ['Preparing', 'Picked', 'On the way', 'Delivered'], default: 'Preparing' },
  deliveryAddress: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<IOrder>('Order', OrderSchema);
