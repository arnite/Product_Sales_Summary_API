import { Request, Response } from 'express';
import { Sale, Product } from '../models';
import { sequelize } from '../config/database';
import { fn, col } from 'sequelize';

export const getSalesSummary = async (req: Request, res: Response) => {
  try {
    const rows = await Sale.findAll({
      attributes: ['productId', [fn('SUM', col('quantity')), 'totalQuantity']],
      include: [
        {
          model: Product,
          attributes: ['name', 'price'],
          required: true,
        },
      ],
      group: [
        'productId',
        col('Product.id'),
        col('Product.name'),
        col('Product.price'),
      ],
      order: [[col('Product.price'), 'DESC']],
    });

    //console.log(rows);
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
