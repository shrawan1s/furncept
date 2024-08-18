export type PackingDataFormValues = {
    customerName: string,
    top: string;
    size: number | '';
    length: number | '';
    width: number | '';
    height: number | '';
    quantity: number | '';
    colorCode: string;
    material: string;
}

export type PackingDataFormProps = {
    customerId: string;
}

export const initialValues: PackingDataFormValues = {
    customerName: '',
    top: '',
    size: '',
    length: '',
    width: '',
    height: '',
    quantity: '',
    colorCode: '',
    material: ''
};
