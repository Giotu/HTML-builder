const path = require('path');
const fs = require('fs');

fs.readdir(
  path.join(__dirname, 'styles'),
  { withFileTypes: true },
  (err, files) => {
    if (err) return console.log(err.message);
    files.forEach((file, index) => {
      if (file.isFile() && path.parse(file.name).ext === '.css') {
        fs.readFile(
          path.join(__dirname, 'styles', file.name),
          'utf8',
          (err, data) => {
            if (err) {
              return console.log(err.message);
            }
            if (index === 0) {
              fs.writeFile(
                path.join(__dirname, 'project-dist', 'bundle.css'),
                data,
                () => {
                  console.log(`Add code from ${file.name} in bundle.css`);
                },
              );
            } else {
              fs.appendFile(
                path.join(__dirname, 'project-dist', 'bundle.css'),
                data,
                () => {
                  console.log(`Add code from ${file.name} in bundle.css`);
                },
              );
            }
          },
        );
      }
    });
  },
);
