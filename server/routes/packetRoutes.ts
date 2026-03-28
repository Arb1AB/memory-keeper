import express from 'express';
import auth from '../middleware/auth';
import { downloadEmergencyPacket } from '../controllers/packetController';

const router = express.Router();

router.use(auth);
router.get('/emergency-packet', downloadEmergencyPacket);

export default router;