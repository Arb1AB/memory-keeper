import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import bcrypt from 'bcryptjs';
import Network from './Network';

interface UserAttributes {
  id?: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'owner' | 'admin' | 'viewer';
  networkId?: number;
  phone?: string;
  isActive: boolean;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public password!: string;
  public firstName!: string;
  public lastName!: string;
  public role!: 'owner' | 'admin' | 'viewer';
  public networkId!: number;
  public phone!: string;
  public isActive!: boolean;
  public network?: Network;

  public async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('owner', 'admin', 'viewer'),
      allowNull: false,
      defaultValue: 'viewer',
    },
    networkId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'networkId',
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    hooks: {
      beforeCreate: async (user: User) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user: User) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

User.belongsTo(Network, { foreignKey: 'networkId', as: 'network' });
Network.hasMany(User, { foreignKey: 'networkId', as: 'members' });

export default User;