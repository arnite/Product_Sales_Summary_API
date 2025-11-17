import { Router } from 'express';
import { getSalesSummary } from '../controllers/saleSummaryController';

const router = Router();

router.route('/').get(getSalesSummary);

export default router;
