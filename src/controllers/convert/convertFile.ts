import { Request, Response } from 'express';
import { spawn } from 'child_process';
import path from 'path';

const pivotCsv = async (csvPath : string, fileName : string, convertPath : string) : Promise<any> => new Promise((resolve, reject) => {
  // Calls the python script to convert the csv file
  const pyout = spawn('python', ['pyscripts/pivotCsv.py', csvPath, fileName, convertPath]);

  // On python script success
  pyout.stdout.on('data', (data) => {
    resolve(data);
  });

  // On python script Error
  pyout.stderr.on('data', (data) => {
    reject(data);
  });
});

const convertFile = async (req : Request, res : Response) => {
  const filepath = req.file?.path;
  const filename = req.file?.filename;
  try {
    if (filepath && filename) {
      // call the function to convert the csv
      const data = await pivotCsv(filepath, path.resolve(`dist/uploads/converted/${filename}`), path.resolve('dist/uploads/converted/'));
      res.send({ data: data.toString(), filename });
    } else {
      // send 400 error if no filename present
      res.status(400).send({ data: 'File not found', filename });
    }
  } catch (error : any) {
    // send 500 error if unknown internal error occurs
    console.log(error.toString());
    res.status(500).send({ error: error.message });
  }
};

export default convertFile;
