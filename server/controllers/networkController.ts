import { Request, Response } from 'express';
import Network from '../models/Network';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';
import crypto from 'crypto';

const generateInviteCode = () => {
  return crypto.randomBytes(6).toString('hex').toUpperCase();
};

export const createNetwork = async (req: AuthRequest, res: Response) => {
  try {
    const { name } = req.body;
    const userId = req.user!.id;

    const inviteCode = generateInviteCode();

    const network = await Network.create({
      name,
      inviteCode,
    });

    await User.update({ networkId: network.id, role: 'owner' }, { where: { id: userId } });

    res.status(201).json({
      id: network.id,
      name: network.name,
      inviteCode: network.inviteCode,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getMyNetwork = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findByPk(req.user!.id, {
      include: [{ model: Network, as: 'network', include: [{ model: User, as: 'members' }] }],
    });

    if (!user || !user.network) {
      return res.status(404).json({ error: 'No network found' });
    }

    res.json(user.network);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const joinNetwork = async (req: AuthRequest, res: Response) => {
  try {
    const { inviteCode } = req.body;
    const userId = req.user!.id;

    const network = await Network.findOne({ where: { inviteCode: inviteCode.toUpperCase() } });

    if (!network) {
      return res.status(404).json({ error: 'Invalid invite code' });
    }

    await User.update({ networkId: network.id, role: 'viewer' }, { where: { id: userId } });

    res.json({ message: 'Joined network successfully', networkId: network.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};