import express from 'express';
import auth from '../middleware/auth';
import {
  getCheckIns,
  createCheckIn,
  updateCheckIn,
  deleteCheckIn,
  respondToCheckIn,
  getPendingCheckIns,
} from '../controllers/checkInController';

const router = express.Router();

router.use(auth);

router.get('/', getCheckIns);
router.get('/pending', getPendingCheckIns);
router.post('/', createCheckIn);
router.put('/:id', updateCheckIn);
router.delete('/:id', deleteCheckIn);
router.post('/:id/respond', respondToCheckIn);

export default router;