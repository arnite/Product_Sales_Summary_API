import { Router } from 'express';
import { getSalesSummary } from '../controllers/saleSummary';

const router = Router();

router.route('/').get(getSalesSummary);

export default router;
