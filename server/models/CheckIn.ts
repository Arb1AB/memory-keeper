import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

interface CheckInAttributes {
  id?: number;
  networkId: number;
  title: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'once';
  scheduledTime?: string;
  lastCheckIn?: Date;
 nextCheckIn?: Date | null;
  status: 'pending' | 'completed' | 'missed';
  response?: string;
  respondedBy?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

class CheckIn extends Model<CheckInAttributes> implements CheckInAttributes {
  public id!: number;
  public networkId!: number;
  public title!: string;
  public description!: string;
  public frequency!: 'daily' | 'weekly' | 'monthly' | 'once';
  public scheduledTime!: string;
  public lastCheckIn!: Date;
  public nextCheckIn!: Date;
  public status!: 'pending' | 'completed' | 'missed';
  public response!: string;
  public respondedBy!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CheckIn.init(
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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    frequency: {
      type: DataTypes.ENUM('daily', 'weekly', 'monthly', 'once'),
      allowNull: false,
      defaultValue: 'daily',
    },
    scheduledTime: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastCheckIn: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    nextCheckIn: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'missed'),
      defaultValue: 'pending',
    },
    response: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    respondedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'CheckIn',
    tableName: 'check_ins',
  }
);



export default CheckIn;