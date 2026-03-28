import express from 'express';
import auth from '../middleware/auth';
import {
  getMedicalInfo,
  updateMedicalInfo,
  getInsurance,
  updateInsurance,
  getPasswords,
  createPassword,
  updatePassword,
  deletePassword,
  getWishes,
  createWish,
  updateWish,
  deleteWish,
} from '../controllers/infoController';

const router = express.Router();

router.use(auth);

// Medical Info
router.get('/medical', getMedicalInfo);
router.put('/medical', updateMedicalInfo);

// Insurance
router.get('/insurance', getInsurance);
router.put('/insurance', updateInsurance);

// Passwords
router.get('/passwords', getPasswords);
router.post('/passwords', createPassword);
router.put('/passwords/:id', updatePassword);
router.delete('/passwords/:id', deletePassword);

// Wishes
router.get('/wishes', getWishes);
router.post('/wishes', createWish);
router.put('/wishes/:id', updateWish);
router.delete('/wishes/:id', deleteWish);

export default router;