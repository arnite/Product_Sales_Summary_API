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
  implements SaleAttributes
{
  public id!: number;
  public productId!: number;
  public quantity!: number;
  public createdAt!: Date;
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
      field: 'product_id',
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'created_at',
    },
  },
  {
    tableName: 'sales',
    sequelize,
    timestamps: false,
  }
);
