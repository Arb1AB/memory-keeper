import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

interface InsuranceAttributes {
  id?: number;
  networkId: number;
  provider?: string;
  policyNumber?: string;
  groupNumber?: string;
  memberId?: string;
  phone?: string;
  notes?: string;
}

class Insurance extends Model<InsuranceAttributes> implements InsuranceAttributes {
  public id!: number;
  public networkId!: number;
  public provider!: string;
  public policyNumber!: string;
  public groupNumber!: string;
  public memberId!: string;
  public phone!: string;
  public notes!: string;
}

Insurance.init(
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
    provider: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    policyNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    groupNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    memberId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Insurance',
    tableName: 'insurances',
  }
);


export default Insurance;