import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

interface WishAttributes {
  id?: number;
  networkId: number;
  title: string;
  description?: string;
  category: 'funeral' | 'medical' | 'estate' | 'personal' | 'other';
  isCompleted: boolean;
}

class Wish extends Model<WishAttributes> implements WishAttributes {
  public id!: number;
  public networkId!: number;
  public title!: string;
  public description!: string;
  public category!: 'funeral' | 'medical' | 'estate' | 'personal' | 'other';
  public isCompleted!: boolean;
}

Wish.init(
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
    category: {
      type: DataTypes.ENUM('funeral', 'medical', 'estate', 'personal', 'other'),
      allowNull: false,
      defaultValue: 'personal',
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'Wish',
    tableName: 'wishes',
  }
);



export default Wish;