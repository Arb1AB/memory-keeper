import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

interface MedicalInfoAttributes {
  id?: number;
  networkId: number;
  conditions?: string;
  allergies?: string;
  medications?: string;
  bloodType?: string;
  primaryDoctor?: string;
  doctorPhone?: string;
  emergencyNotes?: string;
}

class MedicalInfo extends Model<MedicalInfoAttributes> implements MedicalInfoAttributes {
  public id!: number;
  public networkId!: number;
  public conditions!: string;
  public allergies!: string;
  public medications!: string;
  public bloodType!: string;
  public primaryDoctor!: string;
  public doctorPhone!: string;
  public emergencyNotes!: string;
}

MedicalInfo.init(
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
    conditions: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    allergies: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    medications: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    bloodType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    primaryDoctor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doctorPhone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    emergencyNotes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'MedicalInfo',
    tableName: 'medical_infos',
  }
);



export default MedicalInfo;