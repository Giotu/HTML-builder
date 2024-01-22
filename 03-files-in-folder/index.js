const fs = require('fs');
const path = require('path');

fs.readdir(
  path.join(__dirname, 'secret-folder'),
  { withFileTypes: true },
  (err, files) => {
    if (err) {
      throw err;
    }
    files.forEach((file) => {
      if (file.isFile()) {
        transformToFormat(file.name);
      }
    });
  },
);

function transformToFormat(file) {
  const fileName = path.parse(file).name;
  const fileExtension = path.extname(file).slice(1);
  fs.stat(path.join(__dirname, 'secret-folder', file), (err, stats) => {
    if (err) {
      throw err;
    }
    console.log(`${fileName} - ${fileExtension} - ${stats.size}`);
  });
}
