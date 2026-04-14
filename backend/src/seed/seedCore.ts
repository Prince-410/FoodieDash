import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Restaurant from '../models/Restaurant';
import Menu from '../models/Menu';
import connectDB from '../config/db';

dotenv.config();

const seedDB = async () => {
  await connectDB();

  await Restaurant.deleteMany({});
  await Menu.deleteMany({});

  const res1 = await Restaurant.create({
    name: 'Spicy Eats',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    rating: 4.5,
    deliveryTime: 30,
    tags: ['Burger', 'American']
  });

  const res2 = await Restaurant.create({
    name: 'Sushi Station',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    rating: 4.8,
    deliveryTime: 45,
    tags: ['Sushi', 'Japanese']
  });

  await Menu.create({
    restaurantId: res1._id,
    items: [
      { name: 'Classic Burger', price: 150, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', category: 'Main', isVeg: false },
      { name: 'Fries', price: 50, image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', category: 'Sides', isVeg: true },
    ]
  });

  await Menu.create({
    restaurantId: res2._id,
    items: [
      { name: 'Salmon Roll', price: 300, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', category: 'Main', isVeg: false },
    ]
  });

  console.log('Database seeded!');
  process.exit(0);
};

seedDB();
