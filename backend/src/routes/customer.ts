import { Router } from 'express';
import { createCustomer, getCustomer, getAllCustomers, updateCustomer, deleteCustomer } from '../controllers/customerController';

const router = Router();

// Customer creation
router.post('/createcustomer', createCustomer);

// Get customer details
router.get('/getcustomer/:id', getCustomer);

// Get all customers
router.get('/getallcustomers', getAllCustomers);

// Update customer details
router.put('/updatecustomer/:id', updateCustomer);

// Delete customer details
router.delete('/deletecustomer/:id', deleteCustomer);

export default router;
