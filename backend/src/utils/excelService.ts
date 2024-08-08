import * as xlsx from 'xlsx';
import { promises as fs } from 'fs';

// Read headers from the existing Excel file
export const readHeaders = (filePath: string, startRow: number = 0): string[] => {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Read rows and skip metadata rows to find the actual headers
    const headers = xlsx.utils.sheet_to_json(sheet, { header: 1, range: startRow })[0];

    return headers as string[];
};

// Append new data to the existing Excel file
export const appendData = async (filePath: string, headers: string[], newData: any[]) => {
    try {
        // Read the file asynchronously
        const fileBuffer = await fs.readFile(filePath);
        const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convert existing sheet data to an array of arrays
        const existingData: any[] = xlsx.utils.sheet_to_json(sheet, { header: 1 });

        // Convert new data to an array of arrays
        const dataToAppend = newData.map(item => {
            return headers.map(header => item[header] || ''); // Map newData values to the headers
        });

        // Append new data to existing data
        existingData.push(...dataToAppend);

        // Update the sheet with the new data
        const updatedSheet = xlsx.utils.aoa_to_sheet(existingData);
        workbook.Sheets[sheetName] = updatedSheet;

        // Write the updated workbook back to the file asynchronously
        const updatedFileBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' });
        await fs.writeFile(filePath, updatedFileBuffer);

        console.log('Data appended successfully');
    } catch (error:any) {
        console.log('Error appending data:', error.message);
    }
};
