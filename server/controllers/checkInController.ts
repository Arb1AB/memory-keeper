import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import CheckIn from '../models/CheckIn';

export const getCheckIns = async (req: AuthRequest, res: Response) => {
  try {
    const networkId = req.user!.networkId;
    const checkIns = await CheckIn.findAll({
      where: { networkId },
      order: [['createdAt', 'DESC']],
    });
    res.json(checkIns);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const createCheckIn = async (req: AuthRequest, res: Response) => {
  try {
    const networkId = req.user!.networkId;
    const { title, description, frequency, scheduledTime } = req.body;

    let nextCheckIn = new Date();
    if (scheduledTime) {
      const [hours, minutes] = scheduledTime.split(':');
      nextCheckIn.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    }

    const checkIn = await CheckIn.create({
      networkId,
      title,
      description,
      frequency,
      scheduledTime,
      nextCheckIn,
      status: 'pending',
    });

    res.status(201).json(checkIn);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateCheckIn = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const networkId = req.user!.networkId;
    const checkIn = await CheckIn.findOne({ where: { id, networkId } });

    if (!checkIn) {
      return res.status(404).json({ error: 'Check-in not found' });
    }

    await checkIn.update(req.body);
    res.json(checkIn);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteCheckIn = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const networkId = req.user!.networkId;
    const checkIn = await CheckIn.findOne({ where: { id, networkId } });

    if (!checkIn) {
      return res.status(404).json({ error: 'Check-in not found' });
    }

    await checkIn.destroy();
    res.json({ message: 'Check-in deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const respondToCheckIn = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { response } = req.body;
    const networkId = req.user!.networkId;
    const userId = req.user!.id;

    const checkIn = await CheckIn.findOne({ where: { id, networkId } });

    if (!checkIn) {
      return res.status(404).json({ error: 'Check-in not found' });
    }

    const now = new Date();
    let nextCheckIn: Date | null = null;

    switch (checkIn.frequency) {
      case 'daily':
        nextCheckIn = new Date(now);
        nextCheckIn.setDate(now.getDate() + 1);
        if (checkIn.scheduledTime) {
          const [hours, minutes] = checkIn.scheduledTime.split(':');
          nextCheckIn.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        }
        break;
      case 'weekly':
        nextCheckIn = new Date(now);
        nextCheckIn.setDate(now.getDate() + 7);
        if (checkIn.scheduledTime) {
          const [hours, minutes] = checkIn.scheduledTime.split(':');
          nextCheckIn.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        }
        break;
      case 'monthly':
        nextCheckIn = new Date(now);
        nextCheckIn.setMonth(now.getMonth() + 1);
        if (checkIn.scheduledTime) {
          const [hours, minutes] = checkIn.scheduledTime.split(':');
          nextCheckIn.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        }
        break;
      case 'once':
        nextCheckIn = null;
        break;
    }

    await checkIn.update({
      response,
      respondedBy: userId,
      status: 'completed',
      lastCheckIn: now,
      nextCheckIn,
    });

    res.json(checkIn);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getPendingCheckIns = async (req: AuthRequest, res: Response) => {
  try {
    const networkId = req.user!.networkId;
    const now = new Date();

    const pendingCheckIns = await CheckIn.findAll({
      where: {
        networkId,
        status: 'pending',
      },
    });

    const dueCheckIns = pendingCheckIns.filter(checkIn => {
      if (!checkIn.nextCheckIn && checkIn.createdAt) {
        return checkIn.createdAt <= now;
      }
      if (checkIn.nextCheckIn) {
        return checkIn.nextCheckIn <= now;
      }
      return false;
    });

    res.json(dueCheckIns);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};