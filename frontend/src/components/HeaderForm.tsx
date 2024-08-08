import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';

type HeaderFormValues = {
    headers: string[];
}

type HeaderFormProps = {
    onFieldCountChange: (count: number) => void; // Prop type definition
}

const HeaderForm: React.FC<HeaderFormProps> = () => {
    const [headers, setHeaders] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedRow, setSelectedRow] = useState<number | null>(null);

    const initialValues: HeaderFormValues = {
        headers: [''],
    };

    const validationSchema = Yup.object().shape({
        headers: Yup.array()
            .of(Yup.string().required('Header is required'))
            .min(1, 'At least one header is required'),
    });

    const handleFormSubmit = (values: HeaderFormValues) => {
        setHeaders(values.headers);
        setIsModalOpen(true);
    };

    const handleRowSubmit = () => {
        console.log('Selected Row:', selectedRow);
        console.log('Submitted Headers:', headers);
        setIsModalOpen(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add Headers</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleFormSubmit}
                >
                    {({ values }) => (
                        <Form>
                            <FieldArray name="headers">
                                {({ remove, push }) => (
                                    <div>
                                        {values.headers.map((_, index) => (
                                            <div key={index} className="mb-4">
                                                <div className="flex items-center">
                                                    <Field
                                                        name={`headers.${index}`}
                                                        placeholder="Enter header"
                                                        className="flex-grow px-4 py-2 mr-4 border border-gray-300 rounded-md"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="px-4 py-2 text-white bg-red-500 rounded-md"
                                                        onClick={() => remove(index)}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                                <ErrorMessage
                                                    name={`headers.${index}`}
                                                    component="div"
                                                    className="text-red-500 text-sm mt-1"
                                                />
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            className="px-4 py-2 text-white bg-blue-500 rounded-md"
                                            onClick={() => push('')}
                                        >
                                            Add Field
                                        </button>
                                    </div>
                                )}
                            </FieldArray>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 mt-6 font-bold text-white bg-green-500 rounded-md hover:bg-green-600"
                            >
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>

                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-8 rounded-md shadow-md">
                            <h3 className="text-xl font-bold mb-4">Select Row</h3>
                            <input
                                type="number"
                                placeholder="Enter row number"
                                value={selectedRow !== null ? selectedRow : ''}
                                onChange={(e) => setSelectedRow(Number(e.target.value))}
                                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
                            />
                            <button
                                onClick={handleRowSubmit}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                            >
                                Submit Row
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HeaderForm;
