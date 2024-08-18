import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { initialValues, PackingDataFormProps, PackingDataFormValues } from '../utility/PackingDataForm';
import { validationSchema } from '../schema/PackingDataForm';

const PackingDataForm: React.FC<PackingDataFormProps> = () => {
    const handleSubmit = (values: PackingDataFormValues) => {
        // Handle packing data creation
        console.log('Packing Data:', values);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-5xl p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Add Data</h2>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    <Form>
                        {/* Row 1 */}
                        <div className="grid grid-cols-1 gap-6 mb-4">
                            <div>
                                <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">
                                    Customer Name
                                </label>
                                <Field
                                    as="select"
                                    id="customerName"
                                    name="customerName"
                                    className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Select Customer</option>
                                    <option value="customer1">Customer 1</option>
                                    <option value="customer2">Customer 2</option>
                                    <option value="customer3">Customer 3</option>
                                </Field>
                                <ErrorMessage name="customerName" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                        </div>

                        {/* Row 2 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                            <div>
                                <label htmlFor="top" className="block text-sm font-medium text-gray-700">
                                    Top
                                </label>
                                <Field
                                    type="text"
                                    id="top"
                                    name="top"
                                    className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter top"
                                />
                                <ErrorMessage name="top" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div>
                                <label htmlFor="size" className="block text-sm font-medium text-gray-700">
                                    Size
                                </label>
                                <Field
                                    type="number"
                                    id="size"
                                    name="size"
                                    className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter size"
                                />
                                <ErrorMessage name="size" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                        </div>

                        {/* Row 3 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                            <div>
                                <label htmlFor="length" className="block text-sm font-medium text-gray-700">
                                    Length
                                </label>
                                <Field
                                    type="number"
                                    id="length"
                                    name="length"
                                    className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter length"
                                />
                                <ErrorMessage name="length" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div>
                                <label htmlFor="width" className="block text-sm font-medium text-gray-700">
                                    Width
                                </label>
                                <Field
                                    type="number"
                                    id="width"
                                    name="width"
                                    className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter width"
                                />
                                <ErrorMessage name="width" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                        </div>

                        {/* Row 4 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                            <div>
                                <label htmlFor="height" className="block text-sm font-medium text-gray-700">
                                    Height
                                </label>
                                <Field
                                    type="number"
                                    id="height"
                                    name="height"
                                    className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter height"
                                />
                                <ErrorMessage name="height" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div>
                                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                                    Quantity
                                </label>
                                <Field
                                    type="number"
                                    id="quantity"
                                    name="quantity"
                                    className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter quantity"
                                />
                                <ErrorMessage name="quantity" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                        </div>

                        {/* Row 5 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label htmlFor="colorCode" className="block text-sm font-medium text-gray-700">
                                    Color Code
                                </label>
                                <Field
                                    type="text"
                                    id="colorCode"
                                    name="colorCode"
                                    className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter color code"
                                />
                                <ErrorMessage name="colorCode" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div>
                                <label htmlFor="material" className="block text-sm font-medium text-gray-700">
                                    Material
                                </label>
                                <Field
                                    type="text"
                                    id="material"
                                    name="material"
                                    className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter material"
                                />
                                <ErrorMessage name="material" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150"
                        >
                            Submit
                        </button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default PackingDataForm;
