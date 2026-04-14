import { Router } from 'express';
import { getDeliveryPartners } from '../controllers/partnerController';

const router = Router();

router.get('/delivery-partners', getDeliveryPartners);

export default router;
