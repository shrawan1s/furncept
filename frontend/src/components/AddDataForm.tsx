import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';

type AddDataFormValues = {
    data: string[];
}

const AddDataForm: React.FC = () => {
    const initialValues: AddDataFormValues = {
        data: [''],
    };

    const validationSchema = Yup.object().shape({
        data: Yup.array().of(Yup.string().required('Data is required'))
            .min(1, 'At least one data field is required'),
    });

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add Data</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        console.log('Submitted Data:', values.data);
                    }}
                >
                    {({ values }) => (
                        <Form>
                            <FieldArray name="data">
                                {({ remove, push }) => (
                                    <div>
                                        {values.data.map((_, index) => (
                                            <div key={index} className="mb-4">
                                                <div className="flex items-center">
                                                    <Field
                                                        name={`data.${index}`}
                                                        placeholder={`Data ${index + 1}`}
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
                                                    name={`data.${index}`}
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
            </div>
        </div>
    );
};

export default AddDataForm;
