const { exec } = require('child_process');

const runCommand = (command, callback) => {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      callback(error, null);
      return;
    }
    callback(null, stdout || stderr);
  });
};

runCommand('wg-quick up wg0', (error, output) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`output: ${output}`);
});