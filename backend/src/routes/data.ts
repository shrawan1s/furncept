import { Request, Response, Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import xlsx from 'xlsx';
import { readHeaders, appendData } from '../utils/excelService';

const router: Router = Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Use the original file name
    },
});

const upload = multer({ storage });

// Endpoint to upload a Google Sheet or Excel file
router.post('/upload', upload.single('file'), (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const filePath = `uploads/${req.file.originalname}`;
    if (!filePath) return res.status(404).send('File not found')

    res.json({ message: 'File uploaded and processed successfully.', filePath: filePath });
});

// Endpoint to append data to an existing Excel file
router.post('/append', async (req: Request, res: Response) => {
    const { fileName, newData } = req.body;

    if (!fileName || !Array.isArray(newData)) {
        return res.status(400).send('File name and data are required.');
    }

    const filePath = fileName;

    if (!fs.existsSync(filePath)) {
        return res.status(404).send('File not found.');
    }

    try {
        const headers = readHeaders(filePath, 3); // Adjust startRow as needed
        console.log('Headers:', headers);

        // Ensure newData keys match headers
        const normalizedData = newData.map(row => {
            const normalizedRow: any = {};
            headers.forEach(header => {
                normalizedRow[header] = row[header] || ''; // Default to empty string if key doesn't exist
            });
            return normalizedRow;
        });

        appendData(filePath, headers, normalizedData); // Pass headers to appendData
        res.send('Data appended successfully.');
    } catch (error: any) {
        console.error('Error appending data:', error);
        res.status(500).send(error.message);
    }
});

router.get('/readfileheader', async (req: Request, res: Response) => {
    const { fileName } = req.body;

    const filePath = fileName;

    if (!fs.existsSync(filePath)) {
        return res.status(404).send('File not found.');
    }

    try {
        const headers = readHeaders(filePath, 3);
        res.json(headers);
    } catch (error: any) {
        console.error('Error appending data:', error);
        res.status(500).send(error.message);
    }
});

export default router;
