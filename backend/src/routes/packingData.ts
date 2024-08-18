import { Router } from 'express';
import { createPackingData, getPackingData, updatePackingData, deletePackingData } from '../controllers/packingDataController';

const router = Router();

router.post('/createdata', createPackingData);
router.get('/getdata/:customerId', getPackingData);
router.put('/updatedata/:id', updatePackingData);
router.delete('/deletedata/:id', deletePackingData);

export default router;
