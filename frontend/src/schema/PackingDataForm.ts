import * as Yup from "yup";

export const validationSchema = Yup.object({
    customerName: Yup.string()
        .required('Customer Name is required')
        .min(3, 'Customer Name must be at least 3 characters')
        .max(50, 'Customer Name cannot exceed 50 characters'),

    name: Yup.string()
        .required('Name is required')
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name cannot exceed 50 characters'),

    label: Yup.string()
        .required('Label is required')
        .min(2, 'Label must be at least 2 characters')
        .max(30, 'Label cannot exceed 30 characters'),

    no: Yup.string()
        .required('No is required')
        .matches(/^\d+$/, 'No must contain only digits')
        .min(1, 'No must be at least 1 character'),

    unit: Yup.string()
        .required('Label is required')
        .min(2, 'Label must be at least 2 characters')
        .max(30, 'Label cannot exceed 30 characters'),

    L1: Yup.number()
        .required('L1 is required')
        .typeError('L1 must be a number')
        .positive('L1 must be a positive number')
        .min(1, 'L1 must be at least 1')
        .max(10000, 'L1 cannot exceed 10,000'),

    L2: Yup.number()
        .required('L2 is required')
        .typeError('L2 must be a number')
        .positive('L2 must be a positive number')
        .min(1, 'L2 must be at least 1')
        .max(10000, 'L2 cannot exceed 10,000'),

    L3: Yup.number()
        .required('L3 is required')
        .typeError('L3 must be a number')
        .positive('L3 must be a positive number')
        .min(1, 'L3 must be at least 1')
        .max(10000, 'L3 cannot exceed 10,000'),

    Qty: Yup.number()
        .required('Quantity is required')
        .typeError('Quantity must be a number')
        .integer('Quantity must be an integer')
        .positive('Quantity must be a positive number')
        .min(1, 'Quantity must be at least 1')
        .max(100000, 'Quantity cannot exceed 100,000'),

    materialThicknessInput: Yup.string()
        .required("Material Thickness is required")
        .max(50, 'Material Thickness cannot exceed 50 characters'),

    outside: Yup.string()
        .required('Outside is required')
        .min(1, 'Outside must be at least 1 character')
        .max(50, 'Outside cannot exceed 50 characters'),

    inside: Yup.string()
        .required('Inside is required')
        .min(1, 'Inside must be at least 1 character')
        .max(50, 'Inside cannot exceed 50 characters'),

    materialThickness: Yup.string()
        .optional()
        .typeError('Material Thickness be a string'),

    edge: Yup.string()
        .required('Edge is required')
        .min(2, 'Edge must be at least 2 characters')
        .max(30, 'Edge cannot exceed 30 characters'),

    remark: Yup.string()
        .optional()
        .max(200, 'Remark cannot exceed 200 characters'),

    one: Yup.number()
        .optional()
        .typeError('One must be a number'),

    two: Yup.number()
        .optional()
        .typeError('Two must be a number'),

    three: Yup.number()
        .optional()
        .typeError('Three must be a number'),


    five: Yup.string()
        .optional()
        .max(50, 'Five cannot exceed 50 characters'),
});
