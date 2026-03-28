import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import Network from '../models/Network';
import User from '../models/User';
import MedicalInfo from '../models/MedicalInfo';
import Insurance from '../models/Insurance';
import Password from '../models/Password';
import Wish from '../models/Wish';
import { generateEmergencyPacket } from '../services/pdfService';

export const downloadEmergencyPacket = async (req: AuthRequest, res: Response) => {
  try {
    const networkId = req.user!.networkId;
    
    // Fetch all data
    const network = await Network.findByPk(networkId);
    if (!network) {
      return res.status(404).json({ error: 'Network not found' });
    }
    
    const members = await User.findAll({
      where: { networkId },
      attributes: ['id', 'firstName', 'lastName', 'email', 'phone', 'role'],
    });
    
    const medicalInfo = await MedicalInfo.findOne({ where: { networkId } });
    const insurance = await Insurance.findOne({ where: { networkId } });
    const passwords = await Password.findAll({ where: { networkId } });
    const wishes = await Wish.findAll({ where: { networkId } });
    
    const packetData = {
      name: network.name,
      members: members.map(m => m.toJSON()),
      medicalInfo: medicalInfo ? medicalInfo.toJSON() : null,
      insurance: insurance ? insurance.toJSON() : null,
      passwords: passwords.map(p => p.toJSON()),
      wishes: wishes.map(w => w.toJSON()),
    };
    
    generateEmergencyPacket(packetData, res);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error generating packet' });
  }
};
