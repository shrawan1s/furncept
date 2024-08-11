import { MulterFile } from 'multer';

export type MulterFile = {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination: string;
    filename: string;
    path: string;
    buffer: Buffer;
}


declare global {
    namespace Express {
        interface Request {
            file?: MulterFile;
        }
    }
}
