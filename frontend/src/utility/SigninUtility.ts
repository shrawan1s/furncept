// Define TypeScript types for form values
export type SigninFormValues = {
    headers(arg0: string, headers: any): unknown;
    email: string;
    password: string;
};

// Initial values for the form
export const initialValues: SigninFormValues = {
    email: '',
    password: '',
};
