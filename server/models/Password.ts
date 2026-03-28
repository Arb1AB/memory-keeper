import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

interface PasswordAttributes {
  id?: number;
  networkId: number;
  serviceName: string;
  username?: string;
  passwordEncrypted: string;
  notes?: string;
}

class Password extends Model<PasswordAttributes> implements PasswordAttributes {
  public id!: number;
  public networkId!: number;
  public serviceName!: string;
  public username!: string;
  public passwordEncrypted!: string;
  public notes!: string;
}

Password.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    networkId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'families',
        key: 'id',
      },
    },
    serviceName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    passwordEncrypted: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Password',
    tableName: 'passwords',
  }
);



export default Password;