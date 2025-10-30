import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface ProductAttributes {
  id: number;
  name: string;
  price: number;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}

export class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public id!: number;
  public name!: string;
  public price!: number;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
  },
  {
    tableName: 'products',
    sequelize,
    timestamps: false,
  }
);
