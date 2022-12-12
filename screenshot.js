const { exec } = require('child_process');


function screenshot(){
    exec('import -window root screenshot.png', (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
      });
}
screenshot()
module.exports = {
    screenshot
}