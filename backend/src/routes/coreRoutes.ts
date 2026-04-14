import { Router } from 'express';
import { register, login, getMe } from '../controllers/authController';
import { getRestaurants, getRestaurantDetails } from '../controllers/restaurantController';
import { createOrder, getOrder } from '../controllers/orderController';

const router = Router();

// Auth
router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/me', getMe);

// Restaurants
router.get('/restaurants', getRestaurants);
router.get('/restaurants/:id', getRestaurantDetails);

// Orders
router.post('/orders', createOrder);
router.get('/orders/:id', getOrder);

export default router;
