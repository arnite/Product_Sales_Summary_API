import { Request, Response } from 'express';
import { Sale, Product } from '../models';
import { sequelize } from '../config/database';
import { fn, col } from 'sequelize';

export const getSalesSummary = async (req: Request, res: Response) => {
  try {
    const rows = await Sale.findAll({
      attributes: ['productId', [fn('SUM', col('quantity')), 'total_sold']],
      include: [
        {
          model: Product,
          attributes: ['name', 'price'],
        },
      ],
      group: ['Sale.productId', 'Product.id', 'Product.name', 'Product.price'],
      order: [[sequelize.literal('"total_sold"'), 'DESC']],
    });

    // format response to a clean JSON structure
    const result = rows.map((r) => {
      const data = r.get();
      // @ts-ignore
      const product = (r as any).Product;
      return {
        productId: data.productId,
        productName: product?.name ?? null,
        price: product?.price ?? null,
        totalSold: Number((data as any).totalSold ?? 0),
      };
    });

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
