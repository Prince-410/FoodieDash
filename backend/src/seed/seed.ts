import mongoose from 'mongoose';
import dotenv from 'dotenv';
import DeliveryPartner from '../models/DeliveryPartner';

dotenv.config();

const partners = [
  {
    name: 'Rajesh Kumar',
    baseLocation: { lat: 28.6145, lng: 77.2090 },
    pricePerKm: 12,
    rating: 4.8,
    isActive: true,
    vehicleType: 'motorcycle' as const,
    avatar: '/avatars/rajesh.png',
    totalDeliveries: 1247,
  },
  {
    name: 'Priya Sharma',
    baseLocation: { lat: 28.6200, lng: 77.2150 },
    pricePerKm: 10,
    rating: 4.9,
    isActive: true,
    vehicleType: 'scooter' as const,
    avatar: '/avatars/priya.png',
    totalDeliveries: 2103,
  },
  {
    name: 'Amit Verma',
    baseLocation: { lat: 28.6080, lng: 77.2020 },
    pricePerKm: 8,
    rating: 4.5,
    isActive: true,
    vehicleType: 'bicycle' as const,
    avatar: '/avatars/amit.png',
    totalDeliveries: 567,
  },
  {
    name: 'Sunita Devi',
    baseLocation: { lat: 28.6250, lng: 77.2200 },
    pricePerKm: 15,
    rating: 4.7,
    isActive: true,
    vehicleType: 'car' as const,
    avatar: '/avatars/sunita.png',
    totalDeliveries: 890,
  },
  {
    name: 'Vikram Singh',
    baseLocation: { lat: 28.6100, lng: 77.2300 },
    pricePerKm: 11,
    rating: 4.6,
    isActive: true,
    vehicleType: 'motorcycle' as const,
    avatar: '/avatars/vikram.png',
    totalDeliveries: 1580,
  },
  {
    name: 'Neha Gupta',
    baseLocation: { lat: 28.6300, lng: 77.1950 },
    pricePerKm: 9,
    rating: 4.4,
    isActive: false,
    vehicleType: 'scooter' as const,
    avatar: '/avatars/neha.png',
    totalDeliveries: 432,
  },
  {
    name: 'Arjun Patel',
    baseLocation: { lat: 28.6050, lng: 77.2250 },
    pricePerKm: 13,
    rating: 4.9,
    isActive: true,
    vehicleType: 'motorcycle' as const,
    avatar: '/avatars/arjun.png',
    totalDeliveries: 3210,
  },
  {
    name: 'Kavita Reddy',
    baseLocation: { lat: 28.6180, lng: 77.1980 },
    pricePerKm: 14,
    rating: 4.3,
    isActive: true,
    vehicleType: 'car' as const,
    avatar: '/avatars/kavita.png',
    totalDeliveries: 1100,
  },
  {
    name: 'Deepak Yadav',
    baseLocation: { lat: 28.6220, lng: 77.2120 },
    pricePerKm: 7,
    rating: 4.2,
    isActive: true,
    vehicleType: 'bicycle' as const,
    avatar: '/avatars/deepak.png',
    totalDeliveries: 310,
  },
  {
    name: 'Ritu Saxena',
    baseLocation: { lat: 28.6170, lng: 77.2050 },
    pricePerKm: 11,
    rating: 4.7,
    isActive: true,
    vehicleType: 'scooter' as const,
    avatar: '/avatars/ritu.png',
    totalDeliveries: 1890,
  },
  {
    name: 'Mohit Joshi',
    baseLocation: { lat: 28.6120, lng: 77.2180 },
    pricePerKm: 10,
    rating: 4.5,
    isActive: true,
    vehicleType: 'motorcycle' as const,
    avatar: '/avatars/mohit.png',
    totalDeliveries: 780,
  },
  {
    name: 'Ananya Das',
    baseLocation: { lat: 28.6280, lng: 77.2100 },
    pricePerKm: 16,
    rating: 5.0,
    isActive: true,
    vehicleType: 'car' as const,
    avatar: '/avatars/ananya.png',
    totalDeliveries: 4500,
  },
];

async function seed(): Promise<void> {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/foodiedash';
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');

    await DeliveryPartner.deleteMany({});
    console.log('🗑️  Cleared existing partners');

    const created = await DeliveryPartner.insertMany(partners);
    console.log(`🌱 Seeded ${created.length} delivery partners`);

    console.log('\n📋 Seeded partners:');
    created.forEach((p, i) => {
      console.log(
        `   ${i + 1}. ${p.name} — ${p.vehicleType} — ₹${p.pricePerKm}/km — ⭐${p.rating}`
      );
    });

    await mongoose.disconnect();
    console.log('\n✅ Seed complete. Disconnected.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

seed();
