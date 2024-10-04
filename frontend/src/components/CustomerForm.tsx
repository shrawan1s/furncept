import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { CustomerFormValues } from '../utility/CustomerForm';
import { validationSchema } from '../schema/CustomerForm';
import { Customer } from '../utility/Customer';
import { useAppDispatch } from '../app/hooks/hook';
import { createCustomer, updateCustomer } from '../app/slices/customerSlice';

type CustomerFormProps = {
    selectedCustomer: Customer | null;
    onSubmit: () => void;
};

const CustomerForm: React.FC<CustomerFormProps> = ({ selectedCustomer, onSubmit }) => {
    const dispatch = useAppDispatch();

    const initialValues: CustomerFormValues = {
        name: selectedCustomer ? selectedCustomer.name : '',
        email: selectedCustomer ? selectedCustomer.email as string : '',
    };

    const handleSubmit = async (values: CustomerFormValues, { resetForm }: any) => {
        if (selectedCustomer) {
            await dispatch(updateCustomer({ id: selectedCustomer.id, data: values }));
        } else {
            await dispatch(createCustomer(values));
        }
        onSubmit();
        resetForm();
    };

    return (
        <div className="w-full max-w-md p-8 bg-white h-fit rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
                {selectedCustomer ? 'Edit Customer' : 'Add Customer'}
            </h2>
            <Formik
                enableReinitialize  // This ensures form updates with selectedCustomer
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ resetForm }) => {
                    useEffect(() => {
                        resetForm();
                    }, [selectedCustomer, resetForm]);  // Reset form when selectedCustomer changes

                    return (
                        <Form>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Customer Name
                                </label>
                                <Field
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter customer name"
                                />
                                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <Field
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter email address (Optional)"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150"
                            >
                                {selectedCustomer ? 'Update' : 'Submit'}
                            </button>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default CustomerForm;
