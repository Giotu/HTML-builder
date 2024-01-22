const { stdin, stdout } = process;
const fs = require('fs');
const path = require('path');

const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));
stdout.write('Please enter values:\n');

stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    process.exit();
  }
  output.write(data);
});

function sayGoodbye() {
  stdout.write('Time to say goodbye');
}

process.on('exit', sayGoodbye);
process.on('SIGINT', () => {
  process.exit();
});
