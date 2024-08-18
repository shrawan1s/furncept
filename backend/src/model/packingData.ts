import mongoose, { Schema, Document } from 'mongoose';
import { number } from 'yup';

type IPackingData = Document & {
    top: string;
    size: number;
    length: number;
    width: number;
    height: number;
    quantity: number;
    colorCode: string;
    material: string;
    calculation1: number;
    calculation2: number;
    customer: mongoose.Types.ObjectId;
}

const PackingDataSchema: Schema = new Schema({
    top: { type: String, required: true },
    size: { type: Number, required: true },
    length: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    quantity: { type: Number, required: true },
    colorCode: { type: String, required: true },
    material: { type: String, required: true },
    calculation1: { type: Number, required: true },
    calculation2: { type: Number, required: true },
    customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true }
});

export default mongoose.model<IPackingData>('PackingData', PackingDataSchema);
