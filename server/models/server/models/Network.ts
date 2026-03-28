import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

interface NetworkAttributes {
  id?: number;
  name: string;
  inviteCode: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class Network extends Model<NetworkAttributes> implements NetworkAttributes {
  public id!: number;
  public name!: string;
  public inviteCode!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Network.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    inviteCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'Network',
    tableName: 'networks',
  }
);

export default Network;