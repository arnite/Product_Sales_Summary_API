import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface SaleAttributes {
  id: number;
  productId: number;
  quantity: number;
  createdAt?: Date;
}

interface SaleCreationAttributes
  extends Optional<SaleAttributes, 'id' | 'createdAt'> {}

export class Sale
  extends Model<SaleAttributes, SaleCreationAttributes>
  implements SaleCreationAttributes
{
  declare id: number;
  declare productId: number;
  declare quantity: number;
  declare createdAt?: Date;
}

Sale.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'sales',
    sequelize,
    timestamps: false,
  }
);
