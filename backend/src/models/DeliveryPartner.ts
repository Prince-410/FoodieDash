import mongoose, { Schema, Document } from 'mongoose';

export interface IDeliveryPartner extends Document {
  name: string;
  baseLocation: {
    lat: number;
    lng: number;
  };
  pricePerKm: number;
  rating: number;
  isActive: boolean;
  vehicleType: 'bicycle' | 'motorcycle' | 'car' | 'scooter';
  avatar: string;
  totalDeliveries: number;
  createdAt: Date;
  updatedAt: Date;
}

const DeliveryPartnerSchema = new Schema<IDeliveryPartner>(
  {
    name: {
      type: String,
      required: [true, 'Partner name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    baseLocation: {
      lat: {
        type: Number,
        required: [true, 'Latitude is required'],
        min: -90,
        max: 90,
      },
      lng: {
        type: Number,
        required: [true, 'Longitude is required'],
        min: -180,
        max: 180,
      },
    },
    pricePerKm: {
      type: Number,
      required: [true, 'Price per km is required'],
      min: [0, 'Price must be positive'],
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 4.0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    vehicleType: {
      type: String,
      enum: ['bicycle', 'motorcycle', 'car', 'scooter'],
      required: true,
      default: 'motorcycle',
    },
    avatar: {
      type: String,
      default: '',
    },
    totalDeliveries: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

DeliveryPartnerSchema.index({ 'baseLocation.lat': 1, 'baseLocation.lng': 1 });
DeliveryPartnerSchema.index({ isActive: 1 });
DeliveryPartnerSchema.index({ rating: -1 });

export default mongoose.model<IDeliveryPartner>('DeliveryPartner', DeliveryPartnerSchema);
