import * as Yup from 'yup';

// Define Yup schema for form validation
export const SigninSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
});
