import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks/hook';
import { getAllCustomers, deleteCustomer } from '../app/slices/customerSlice';
import { Customer } from '../utility/Customer';
import { RootState } from '../app/store';
import Modal from './Modal';

type Pops = {
    onEdit: (customer: Customer) => void;
};

const CustomerList: React.FC<Pops> = ({ onEdit }) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

    const dispatch = useAppDispatch();
    const { customers } = useAppSelector((state: RootState) => state.customer);

    useEffect(() => {
        dispatch(getAllCustomers());
    }, [dispatch]);

    const handleClick = (taskId: number) => {
        setSelectedTaskId(taskId);
        setShowModal(true);
    };

    const handleConfirm = async () => {
        if (selectedTaskId) {
            await dispatch(deleteCustomer(selectedTaskId as number));
        }
        setShowModal(false);
    };

    const handleCancel = () => {
        setSelectedTaskId(null);
        setShowModal(false);
    };

    return (
        <>
            <div className="my-16 w-full max-w-4xl">
                <div className="overflow-y-auto max-h-96 no-scrollbar">
                    <table className="min-w-full bg-white border-collapse border border-gray-300">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">ID</th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Name</th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Email</th>
                                <th className="py-3 px-6 text-center text-sm font-medium text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.length > 0 ? (
                                customers.map((customer: Customer, index: number) => (
                                    <tr
                                        key={customer.id}
                                        className="hover:bg-gray-100 transition duration-200 ease-in-out"
                                    >
                                        <td className="py-3 px-6 text-sm font-medium text-gray-800">{index + 1}</td>
                                        <td className="py-3 px-6 text-sm text-gray-800">{customer.name}</td>
                                        <td className="py-3 px-6 text-sm text-gray-800">
                                            {customer.email || 'N/A'}
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            <button
                                                className="py-2 text-white bg-blue-500 rounded-md mx-2 w-full mb-2"
                                                onClick={() => onEdit(customer)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="py-2 text-white bg-red-500 rounded-md mx-2 w-full"
                                                onClick={() => handleClick(customer.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="py-3 px-6 text-center text-sm font-medium text-gray-700">
                                        No customers found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal && (
                <Modal
                    title="Confirm Delete Task"
                    content="Are you sure you want delete?"
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}
        </>
    );
};

export default CustomerList;
