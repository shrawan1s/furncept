import mongoose, { Schema, Document } from 'mongoose';

// Define the type for customer model
export type ICustomer = Document & {
    name: string;
    email: string;
    packingData: mongoose.Types.ObjectId[];
};

const CustomerSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    packingData: [{ type: Schema.Types.ObjectId, ref: 'PackingData' }]
});

export default mongoose.model<ICustomer>('Customer', CustomerSchema);
