const path = require('path');
const fs = require('fs');

fs.readFile(path.join(__dirname, 'template.html'), (err, data) => {
  const template = data;
});
