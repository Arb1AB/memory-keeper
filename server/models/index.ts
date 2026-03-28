import User from './User';
import Network from './Network';
import MedicalInfo from './MedicalInfo';
import Insurance from './Insurance';
import Password from './Password';
import Wish from './Wish';
import CheckIn from './CheckIn';
import sequelize from '../config/database';

// User associations
User.belongsTo(Network, { foreignKey: 'networkId', as: 'network' });

// Network associations
Network.hasMany(User, { foreignKey: 'networkId', as: 'members' });
Network.hasOne(MedicalInfo, { foreignKey: 'networkId', as: 'medicalInfo' });
Network.hasOne(Insurance, { foreignKey: 'networkId', as: 'insurance' });
Network.hasMany(Password, { foreignKey: 'networkId', as: 'passwords' });
Network.hasMany(Wish, { foreignKey: 'networkId', as: 'wishes' });
Network.hasMany(CheckIn, { foreignKey: 'networkId', as: 'checkIns' });

// Child model associations
MedicalInfo.belongsTo(Network, { foreignKey: 'networkId', as: 'medicalNetwork' });
Insurance.belongsTo(Network, { foreignKey: 'networkId', as: 'insuranceNetwork' });
Password.belongsTo(Network, { foreignKey: 'networkId', as: 'passwordNetwork' });
Wish.belongsTo(Network, { foreignKey: 'networkId', as: 'wishNetwork' });
CheckIn.belongsTo(Network, { foreignKey: 'networkId', as: 'checkInNetwork' });

const db = {
  sequelize,
  User,
  Network,
  MedicalInfo,
  Insurance,
  Password,
  Wish,
  CheckIn,
};

export default db;
