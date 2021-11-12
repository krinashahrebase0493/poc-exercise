import multer from 'multer';
import path from 'path';

const csvStorage = multer.diskStorage({
  // Destination to store csv
  destination: 'dist/uploads/csv',
  filename: (req, file, cb) => {
    if (!file.originalname.match(/\.(csv)$/)) {
      return cb(new Error('Please upload a csv file'), file.originalname);
    }
    return cb(null, `${file.originalname.split('.csv')[0]}_${Date.now()
    }${path.extname(file.originalname)}`);
  },
});

const uploadCsv = multer(
  {
    storage: csvStorage,
  },
);

export default uploadCsv;
