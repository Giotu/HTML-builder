const { stdin } = process;
const fs = require('fs');
const path = require('path');

const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdin.on('data', (data) => {
  output.write(data);
});
