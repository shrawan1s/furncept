import { Router } from 'express';
import { createPackingData, getPackingData, updatePackingData, deletePackingData } from '../controllers/packingDataController';

const router = Router();

// Data add
router.post('/createdata', createPackingData);

// Get data
router.get('/getdata/:customerId', getPackingData);

// Update data
router.put('/updatedata/:id', updatePackingData);

// Delete data
router.delete('/deletedata/:id', deletePackingData);

export default router;
