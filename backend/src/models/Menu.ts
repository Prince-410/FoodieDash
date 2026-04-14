import mongoose, { Schema, Document } from 'mongoose';

export interface IMenuItem {
  _id?: mongoose.Types.ObjectId;
  name: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
}

export interface IMenu extends Document {
  restaurantId: mongoose.Types.ObjectId;
  items: IMenuItem[];
}

const MenuItemSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  isVeg: { type: Boolean, default: true },
});

const MenuSchema: Schema = new Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  items: [MenuItemSchema],
}, { timestamps: true });

export default mongoose.model<IMenu>('Menu', MenuSchema);
