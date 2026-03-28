import express from 'express';
import { createNetwork, getMyNetwork, joinNetwork } from '../controllers/networkController';
import auth from '../middleware/auth';

const router = express.Router();

router.use(auth);

router.post('/create', createNetwork);
router.get('/my-network', getMyNetwork);
router.post('/join', joinNetwork);

export default router;