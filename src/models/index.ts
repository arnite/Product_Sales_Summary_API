import { Product } from './productModel';
import { Sale } from './salesModel';

// Associations
Product.hasMany(Sale, { foreignKey: 'productId', sourceKey: 'id' });
Sale.belongsTo(Product, { foreignKey: 'productId', targetKey: 'id' });

export { Product, Sale };
