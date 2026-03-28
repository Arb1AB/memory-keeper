import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

interface FamilyAttributes {
  id?: number;
  name: string;
  inviteCode: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class Family extends Model<FamilyAttributes> implements FamilyAttributes {
  public id!: number;
  public name!: string;
  public inviteCode!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Family.init(
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
    modelName: 'Family',
    tableName: 'families',
  }
);

export default Family;