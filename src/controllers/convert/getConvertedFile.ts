import { Request, Response } from 'express';
import path from 'path';
import * as fs from 'fs';

const getConvertedFile = async (req: Request, res: Response) => {
  const { filename } = req.params;
  try {
    if (fs.existsSync(`dist/uploads/converted/${filename}`)) {
      // send the file if exists
      const filepath = path.resolve(`dist/uploads/converted/${filename}`);
      res.download(filepath);
    } else {
      // send 400 error if file doesnt exists
      res.status(400).send({ error: 'File not found' });
    }
  } catch (error : any) {
    // send 500 error if unknown internal error occurs
    res.status(500).send({ error: error.message });
  }
};

export default getConvertedFile;
