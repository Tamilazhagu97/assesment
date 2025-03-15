import { Request, Response } from "express";
import * as multer from "multer";
import { CsvService } from "../service/csvProcessor";

// Configure multer for file upload
const upload = multer({ dest: 'uploads/' });

// Controller to handle file upload and processing
export const uploadCSV = async (req: Request | any, res: Response| any) => {
    try {
        upload.single('csvFile')(req, res, async () => {
            if (!req.file) {
                return res.status(400).send("No file uploaded.");
            } 

            // Process the CSV file using the service
            await CsvService.processCSV(req.file.path);

            res.status(200).send("CSV file processed successfully.");
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while processing the file.");
    }
};
