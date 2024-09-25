// Define the structure for the form values
export type PackingDataFormValues = {
    customerName: string;
    name: string;
    label: string;
    no: string;
    unit: string;
    L1: number;
    L2: number;
    L3: number;
    Qty: number;
    materialThicknessInput: string;
    outside: string;
    inside: string;
    materialThickness: string;
    edge: string;
    remark: string;
    one: number;
    two: number;
    three: number;
    four: number;
    five?: string;
};

// Define the props for the packing data form
export type PackingDataFormProps = {
    customerId: string;
};

// Set initial values for the form fields
export const initialValues: PackingDataFormValues = {
    customerName: '',
    name: '',
    label: '',
    no: '',
    unit: '',
    L1: 0,
    L2: 0,
    L3: 0,
    Qty: 0,
    materialThicknessInput: '',
    outside: '',
    inside: '',
    materialThickness: '',
    edge: '',
    remark: '',
    one: 0,
    two: 0,
    three: 0,
    four: 1,
    five: '',
};
