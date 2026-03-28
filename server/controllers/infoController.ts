import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import MedicalInfo from '../models/MedicalInfo';
import Insurance from '../models/Insurance';
import Password from '../models/Password';
import Wish from '../models/Wish';

// Medical Info
export const getMedicalInfo = async (req: AuthRequest, res: Response) => {
  try {
    const networkId = req.user!.networkId;
    const medicalInfo = await MedicalInfo.findOne({ where: { networkId } });
    res.json(medicalInfo || {});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateMedicalInfo = async (req: AuthRequest, res: Response) => {
  try {
    const networkId = req.user!.networkId;
    const [medicalInfo, created] = await MedicalInfo.findOrCreate({
      where: { networkId },
      defaults: { networkId, ...req.body },
    });

    if (!created) {
      await medicalInfo.update(req.body);
    }

    res.json(medicalInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Insurance
export const getInsurance = async (req: AuthRequest, res: Response) => {
  try {
    const networkId = req.user!.networkId;
    const insurance = await Insurance.findOne({ where: { networkId } });
    res.json(insurance || {});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateInsurance = async (req: AuthRequest, res: Response) => {
  try {
    const networkId = req.user!.networkId;
    const [insurance, created] = await Insurance.findOrCreate({
      where: { networkId },
      defaults: { networkId, ...req.body },
    });

    if (!created) {
      await insurance.update(req.body);
    }

    res.json(insurance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Passwords
export const getPasswords = async (req: AuthRequest, res: Response) => {
  try {
    const networkId = req.user!.networkId;
    const passwords = await Password.findAll({ where: { networkId } });
    res.json(passwords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const createPassword = async (req: AuthRequest, res: Response) => {
  try {
    const networkId = req.user!.networkId;
    const password = await Password.create({ networkId, ...req.body });
    res.status(201).json(password);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updatePassword = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const networkId = req.user!.networkId;
    const password = await Password.findOne({ where: { id, networkId } });

    if (!password) {
      return res.status(404).json({ error: 'Password entry not found' });
    }

    await password.update(req.body);
    res.json(password);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deletePassword = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const networkId = req.user!.networkId;
    const password = await Password.findOne({ where: { id, networkId } });

    if (!password) {
      return res.status(404).json({ error: 'Password entry not found' });
    }

    await password.destroy();
    res.json({ message: 'Password entry deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Wishes
export const getWishes = async (req: AuthRequest, res: Response) => {
  try {
    const networkId = req.user!.networkId;
    const wishes = await Wish.findAll({ where: { networkId } });
    res.json(wishes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const createWish = async (req: AuthRequest, res: Response) => {
  try {
    const networkId = req.user!.networkId;
    const wish = await Wish.create({ networkId, ...req.body });
    res.status(201).json(wish);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateWish = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const networkId = req.user!.networkId;
    const wish = await Wish.findOne({ where: { id, networkId } });

    if (!wish) {
      return res.status(404).json({ error: 'Wish not found' });
    }

    await wish.update(req.body);
    res.json(wish);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteWish = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const networkId = req.user!.networkId;
    const wish = await Wish.findOne({ where: { id, networkId } });

    if (!wish) {
      return res.status(404).json({ error: 'Wish not found' });
    }

    await wish.destroy();
    res.json({ message: 'Wish deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};