import { Request, Response } from 'express';
import Order from '../models/Order';
import { io } from '../server';

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const newOrder = new Order({
        ...req.body,
        status: 'Preparing'
    });
    await newOrder.save();
    
    // Simulate order progression
    setTimeout(async () => {
       await Order.findByIdAndUpdate(newOrder._id, { status: 'Picked' });
       io?.emit(`order_update_${newOrder._id}`, { status: 'Picked' });
    }, 10000);

    setTimeout(async () => {
       await Order.findByIdAndUpdate(newOrder._id, { status: 'On the way' });
       io?.emit(`order_update_${newOrder._id}`, { status: 'On the way' });
    }, 20000);

    setTimeout(async () => {
       await Order.findByIdAndUpdate(newOrder._id, { status: 'Delivered' });
       io?.emit(`order_update_${newOrder._id}`, { status: 'Delivered' });
    }, 30000);

    res.status(201).json(newOrder);
  } catch (e) {
    res.status(500).json({ error: 'Error' });
  }
};

export const getOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await Order.findById(req.params.id).populate('restaurantId').populate('deliveryPartnerId');
    res.json(order);
  } catch (e) { res.status(500).json({ error: 'Error' }); }
}
