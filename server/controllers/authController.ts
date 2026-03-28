import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Network from '../models/Network';
import crypto from 'crypto';

const generateToken = (id: number) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: '30d',
  });
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;

    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
      phone,
      role: 'owner',
      isActive: true,
    });

    // Auto-create a network for the user
    const inviteCode = crypto.randomBytes(6).toString('hex').toUpperCase();
    
    const network = await Network.create({
      name: `${firstName}'s Network`,
      inviteCode,
    });

    await user.update({ networkId: network.id });

    const token = generateToken(user.id);

    res.status(201).json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user.id);

    res.json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk((req as any).user.id, {
      attributes: { exclude: ['password'] },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};