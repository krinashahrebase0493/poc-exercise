import { Request, Response } from 'express';
import { spawn } from 'child_process';
import deleteFile from '../../utils/deleteFile';

const pivotCsv = async (csvPath : string) : Promise<any> => new Promise((resolve, reject) => {
  // Calls the python script to convert the csv file
  const pyout = spawn('python', ['pyscripts/pivotCsv.py', csvPath]);

  // On python script success
  pyout.stdout.on('data', (data) => {
    resolve(data.toString());
  });

  // On python script Error
  pyout.stderr.on('data', (data) => {
    reject(new Error(data.toString()));
  });
});

const convertFile = async (req : Request, res : Response) => {
  const filepath = req.file?.path;
  const filename = req.file?.filename;
  const originalName = req.file?.originalname;
  try {
    if (filepath && filename && originalName) {
      // call the function to convert the csv
      const resp = await pivotCsv(filepath);
      // send the converted data as file
      res.attachment(originalName).send(resp);
      // delete the original file
      deleteFile(filepath);
    } else {
      // send 400 error if no filename present
      res.status(400).send({ error: 'File not found' });
    }
  } catch (error : any) {
    // send 500 error if unknown internal error occurs
    if (filepath) deleteFile(filepath);
    res.status(500).send({ error: error.message });
  }
};

export default convertFile;
