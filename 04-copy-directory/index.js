const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
  if (err) {
    throw err;
  }
  console.log('folder files-copy created');
  fs.readdir(path.join(__dirname, 'files'), (err, files) => {
    if (err) {
      throw err;
    }
    files.forEach((file) => {
      fs.copyFile(
        path.join(__dirname, 'files', file),
        path.join(__dirname, 'files-copy', file),
        (err) => {
          if (err) return console.log(err.message);
          console.log(`copy file: ${file}`);
        },
      );
    });
  });
});
