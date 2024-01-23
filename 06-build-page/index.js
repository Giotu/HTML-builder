const path = require('path');
const fs = require('fs');

let template = '';
const pathDist = path.join(__dirname, 'project-dist');
const pathTemplate = path.join(__dirname, 'template.html');
const pathCopyTemplate = path.join(__dirname, 'project-dist', 'index.html');
const pathComponents = path.join(__dirname, 'components');

fs.mkdir(pathDist, { recursive: true }, (err) => {
  if (err) return console.log(err.message);
  createCSSFile();
  createHTMLFile();
});

function createCSSFile() {
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
                fs.writeFile(path.join(pathDist, 'style.css'), data, () => {
                  console.log(`Add code from ${file.name} in style.css`);
                });
              } else {
                fs.appendFile(path.join(pathDist, 'style.css'), data, () => {
                  console.log(`Add code from ${file.name} in style.css`);
                });
              }
            },
          );
        }
      });
    },
  );
}

function createHTMLFile() {
  fs.readdir(pathComponents, (err, files) => {
    if (err) return console.log(err.message);
    fs.readFile(pathTemplate, 'utf8', (err, data) => {
      template = data;
      if (err) return console.log(err.message);
      files.forEach((file, indexFile) => {
        if (path.extname(file) === '.html') {
          const componentName = path.parse(file).name;
          fs.readFile(
            path.join(pathComponents, file),
            'utf8',
            (err, dataComponent) => {
              template = template.replace(
                `{{${componentName}}}`,
                dataComponent,
              );
              if (indexFile === files.length - 1) {
                fs.writeFile(pathCopyTemplate, template, () => {
                  console.log('Create index.html');
                });
              }
            },
          );
        }
      });
    });
  });
}
