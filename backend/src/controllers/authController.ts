import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, address, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) { res.status(400).json({ error: 'Email in use' }); return; }

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed, address, role });
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    res.status(201).json({ token, user: { _id: user._id, name: user.name, email: user.email, address: user.address, role: user.role } });
  } catch(e) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.password) { res.status(400).json({ error: 'Invalid creds' }); return; }

    const match = await bcrypt.compare(password, user.password);
    if (!match) { res.status(400).json({ error: 'Invalid creds' }); return; }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    res.status(200).json({ token, user: { _id: user._id, name: user.name, email: user.email, address: user.address, role: user.role } });
  } catch(e) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
   try {
     const token = req.headers.authorization?.split(' ')[1];
     if (!token) { res.status(401).json({ error: 'No token' }); return; }
     const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
     const user = await User.findById(decoded.id).select('-password');
     res.json(user);
   } catch(e) {
     res.status(401).json({ error: 'Invalid token' });
   }
}
