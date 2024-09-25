import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { initialValues, PackingDataFormProps, PackingDataFormValues } from '../utility/PackingDataForm';
import { validationSchema } from '../schema/PackingDataForm';

const PackingDataForm: React.FC<PackingDataFormProps> = () => {
    const handleSubmit = (values: PackingDataFormValues) => {
        console.log('Packing Data:', values);
    };

    // Function to calculate "One", "Two", "Three" fields dynamically
    const calculateFields = (values: PackingDataFormValues) => {
        const { L1, L2, L3, unit, Qty, outside, inside } = values;

        const one = L1 && L2 && Qty ? ((L1 * L2) / 1000000) * Qty : 0;
        const two = L1 && Qty ? (((L1 * 2) + 200) / 1000) * Qty : 0;
        const three = one ? one * 15.25 : 0;
        const materialThickness = L3 && unit && outside && inside
            ? `${L3} + ${unit} + ${outside} + ${inside}`
            : '';

        return { one, two, three, materialThickness };
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-5xl p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Add Data</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, setFieldValue }) => {
                        const { one, two, three, materialThickness } = calculateFields(values);

                        useEffect(() => {
                            // Update form values when relevant fields change
                            setFieldValue('one', one);
                            setFieldValue('two', two);
                            setFieldValue('three', three);
                            setFieldValue('materialThickness', materialThickness);
                        }, [one, two, three, materialThickness, setFieldValue]);

                        return (
                            <Form>
                                {/* Customer Name */}
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

                                {/* Name Field */}
                                <div className="grid grid-cols-1 mb-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                        <Field type="text" id="name" name="name" className="mt-1 p-2 block w-full" placeholder="Enter name" />
                                        <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                </div>

                                {/* Label, No, Unit */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                                    <div>
                                        <label htmlFor="label" className="block text-sm font-medium text-gray-700">Label</label>
                                        <Field type="text" id="label" name="label" className="mt-1 p-2 block w-full" placeholder="Enter label" />
                                        <ErrorMessage name="label" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <div>
                                        <label htmlFor="no" className="block text-sm font-medium text-gray-700">No</label>
                                        <Field type="text" id="no" name="no" className="mt-1 p-2 block w-full" placeholder="Enter number" />
                                        <ErrorMessage name="no" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <div>
                                        <label htmlFor="unit" className="block text-sm font-medium text-gray-700">Unit</label>
                                        <Field type="text" id="unit" name="unit" className="mt-1 p-2 block w-full" placeholder="Enter unit" />
                                        <ErrorMessage name="unit" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                </div>

                                {/* L1, L2, L3 */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                                    <div>
                                        <label htmlFor="L1" className="block text-sm font-medium text-gray-700">L1</label>
                                        <Field type="number" id="L1" name="L1" className="mt-1 p-2 block w-full" placeholder="Enter L1" />
                                        <ErrorMessage name="L1" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <div>
                                        <label htmlFor="L2" className="block text-sm font-medium text-gray-700">L2</label>
                                        <Field type="number" id="L2" name="L2" className="mt-1 p-2 block w-full" placeholder="Enter L2" />
                                        <ErrorMessage name="L2" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <div>
                                        <label htmlFor="L3" className="block text-sm font-medium text-gray-700">L3</label>
                                        <Field type="number" id="L3" name="L3" className="mt-1 p-2 block w-full" placeholder="Enter L3" />
                                        <ErrorMessage name="L3" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                </div>

                                {/* Quantity, Material Thickness, Outside */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                                    <div>
                                        <label htmlFor="Qty" className="block text-sm font-medium text-gray-700">Quantity</label>
                                        <Field type="number" id="Qty" name="Qty" className="mt-1 p-2 block w-full" placeholder="Enter Qty" />
                                        <ErrorMessage name="Qty" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <div>
                                        <label htmlFor="materialThicknessInput" className="block text-sm font-medium text-gray-700">Material Thickness</label>
                                        <Field type="text" id="materialThicknessInput" name="materialThicknessInput" placeholder="Enter Material Thickness" className="mt-1 p-2 block w-full" />
                                        <ErrorMessage name="materialThicknessInput" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <div>
                                        <label htmlFor="outside" className="block text-sm font-medium text-gray-700">Outside</label>
                                        <Field type="text" id="outside" name="outside" className="mt-1 p-2 block w-full" placeholder="Enter Outside" />
                                        <ErrorMessage name="outside" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                </div>

                                {/* Inside Field, Edge, Material Thickness ReadOnly */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                                    <div>
                                        <label htmlFor="inside" className="block text-sm font-medium text-gray-700">Inside</label>
                                        <Field type="text" id="inside" name="inside" className="mt-1 p-2 block w-full" placeholder="Enter Inside" />
                                        <ErrorMessage name="inside" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <div>
                                        <label htmlFor="materialThickness" className="block text-sm font-medium text-gray-700">Computed Material Thickness</label>
                                        <Field type="text" id="materialThickness" name="materialThickness" placeholder="Material Thickness" className="mt-1 p-2 block w-full" readOnly />
                                    </div>
                                    <div>
                                        <label htmlFor="edge" className="block text-sm font-medium text-gray-700">Edge</label>
                                        <Field type="text" id="edge" name="edge" className="mt-1 p-2 block w-full" placeholder="Enter Edge" />
                                        <ErrorMessage name="edge" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                </div>

                                {/* Remark Field */}
                                <div className="grid grid-cols-1 mb-4">
                                    <div>
                                        <label htmlFor="remark" className="block text-sm font-medium text-gray-700">Remark</label>
                                        <Field type="text" id="remark" name="remark" className="mt-1 p-2 block w-full" placeholder="Enter Remark(Optional)" />
                                        <ErrorMessage name="remark" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                </div>

                                {/* Computed Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                                    <div>
                                        <label htmlFor="one" className="block text-sm font-medium text-gray-700">One</label>
                                        <Field type="number" id="one" name="one" className="mt-1 p-2 block w-full" readOnly />
                                    </div>
                                    <div>
                                        <label htmlFor="two" className="block text-sm font-medium text-gray-700">Two</label>
                                        <Field type="number" id="two" name="two" className="mt-1 p-2 block w-full" readOnly />
                                    </div>
                                    <div>
                                        <label htmlFor="three" className="block text-sm font-medium text-gray-700">Three</label>
                                        <Field type="number" id="three" name="three" className="mt-1 p-2 block w-full" readOnly />
                                    </div>
                                    <div>
                                        <label htmlFor="four" className="block text-sm font-medium text-gray-700">Four</label>
                                        <Field type="number" id="four" name="four" className="mt-1 p-2 block w-full" readOnly />
                                    </div>
                                </div>

                                {/* Optional Field "Five" */}
                                <div className="grid grid-cols-1 gap-6 mb-6">
                                    <div>
                                        <label htmlFor="five" className="block text-sm font-medium text-gray-700">Five (Optional)</label>
                                        <Field type="text" id="five" name="five" className="mt-1 p-2 block w-full" placeholder="Optional field" />
                                        <ErrorMessage name="five" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150"
                                >
                                    Submit
                                </button>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
};

export default PackingDataForm;
