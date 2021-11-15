import express from 'express';
import convertFile from '../controllers/convert/convertFile';
import uploadCsv from '../middleware/upload';

const convertRoute = express.Router();

// Route to convert the given file and return the converted file
convertRoute.post('/file', uploadCsv.single('file'), convertFile);

export default convertRoute;
