import * as fs from 'fs';

// Delete file from given path
const deleteFile = (filepath : string) => {
  if (fs.existsSync(filepath)) {
    fs.unlinkSync(filepath);
  }
};

export default deleteFile;
