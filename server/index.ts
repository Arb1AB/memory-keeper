import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import sequelize, { testConnection } from './config/database';
import authRoutes from './routes/authRoutes';
import networkRoutes from './routes/networkRoutes';
import infoRoutes from './routes/infoRoutes';
import checkInRoutes from './routes/checkInRoutes';
import packetRoutes from './routes/packetRoutes';

import './models';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

testConnection();

sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced');
});

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/family', networkRoutes);
app.use('/api/info', infoRoutes);
app.use('/api/checkins', checkInRoutes);
app.use('/api/packet', packetRoutes);
app.use('/api/network', networkRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Memory Keeper API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});