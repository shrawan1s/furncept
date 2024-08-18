import { Router } from 'express';
import { createCustomer, getCustomers, getAllCustomers, updateCustomer, deleteCustomer } from '../controllers/customerController';

const router = Router();

router.post('/createcustomer', createCustomer);
router.get('/getcustomer/:id', getCustomers);
router.get('/getallcustomer', getAllCustomers);
router.put('/updatecustomer/:id', updateCustomer);
router.delete('/deletecustomer/:id', deleteCustomer);

export default router;
