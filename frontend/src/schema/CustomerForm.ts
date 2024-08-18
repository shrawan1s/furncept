import * as Yup from "yup";

export const validationSchema = Yup.object({
    name: Yup.string().required('Customer name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required')
});
