import { faker } from '@faker-js/faker';
import { sequelize } from '../config/database';
import '../models';
import { Product, Sale } from '../models';

async function seedDatabase() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    await sequelize.sync({ force: true }); // ⚠ Deletes existing data (dev only)
    console.log('✅ Database synced.');

    // 1️⃣ Create Products
    const products: Product[] = [];
    for (let i = 0; i < 10; i++) {
      const product = await Product.create({
        name: faker.commerce.productName(),
        price: Number(faker.commerce.price({ min: 10, max: 2000 })),
      });
      products.push(product);
    }

    console.log('✅ Products created!');
    console.log(products.map((p) => p.id));

    // 2️⃣ Create Random Sales for Products
    for (const product of products) {
      const salesCount = faker.number.int({ min: 5, max: 20 }); // 5–20 sales per product

      for (let i = 0; i < salesCount; i++) {
        await Sale.create({
          productId: product.id,
          quantity: faker.number.int({ min: 1, max: 50 }),
          createdAt: faker.date.past(), // random past date
        });
      }
    }

    console.log('✅ Sales created for all products!');
    process.exit(0); // end script
  } catch (err) {
    console.error('❌ Error seeding database:', err);
    process.exit(1);
  }
}

seedDatabase();
