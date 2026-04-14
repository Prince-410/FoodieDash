import { Request, Response } from 'express';
import Restaurant from '../models/Restaurant';
import Menu from '../models/Menu';

export const getRestaurants = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await Restaurant.find();
    res.json(data);
  } catch (e) { res.status(500).json({ error: 'Error' }); }
};

export const getRestaurantDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    const menu = await Menu.findOne({ restaurantId: req.params.id });
    res.json({ restaurant, menu });
  } catch (e) { res.status(500).json({ error: 'Error' }); }
};
