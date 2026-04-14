import mongoose, { Schema, Document } from 'mongoose';

export interface IRestaurant extends Document {
  name: string;
  image: string;
  rating: number;
  deliveryTime: number; // in mins
  tags: string[];
}

const RestaurantSchema: Schema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: Number, default: 0 },
  deliveryTime: { type: Number, required: true },
  tags: [{ type: String }],
}, { timestamps: true });

export default mongoose.model<IRestaurant>('Restaurant', RestaurantSchema);
