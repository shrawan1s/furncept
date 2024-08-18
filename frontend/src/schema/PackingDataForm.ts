import * as Yup from "yup";

export const validationSchema = Yup.object({
    customerName: Yup.string().required('Customer Name is required'),
    top: Yup.string().required('Top is required'),
    size: Yup.number().required('Size is required').typeError('Size must be a number'),
    length: Yup.number().required('Length is required').typeError('Length must be a number'),
    width: Yup.number().required('Width is required').typeError('Width must be a number'),
    height: Yup.number().required('Height is required').typeError('Height must be a number'),
    quantity: Yup.number().required('Quantity is required').typeError('Quantity must be a number'),
    colorCode: Yup.string().required('Color code is required'),
    material: Yup.string().required('Material is required')
});
