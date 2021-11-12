import express from 'express';
import convertFile from '../controllers/convert/convertFile';
import getConvertedFile from '../controllers/convert/getConvertedFile';
import uploadCsv from '../middleware/upload';

const convertRoute = express.Router();

// Route to convert the given file and return the converted files name
convertRoute.post('/file', uploadCsv.single('file'), convertFile);

// Route to download the file which was converted using previous route
convertRoute.get('/file/:filename', getConvertedFile);

export default convertRoute;
