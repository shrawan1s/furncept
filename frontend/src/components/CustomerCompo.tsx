import { useState } from 'react';
import CustomerForm from './CustomerForm';
import CustomerList from './CustomerList';
import { Customer } from '../utility/Customer';

const CustomerCompo = () => {
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

    const handleEdit = (customer: Customer) => {
        setSelectedCustomer(customer);
        console.log(selectedCustomer);
    };

    const handleFormSubmit = () => {
        setSelectedCustomer(null);
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
            <CustomerForm selectedCustomer={selectedCustomer} onSubmit={handleFormSubmit} />
            <CustomerList onEdit={handleEdit} />
        </div>
    );
};

export default CustomerCompo;
