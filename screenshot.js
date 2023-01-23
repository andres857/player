const { exec } = require('child_process');
const fs = require('fs');

function screenshot() {
    if(fs.existsSync('screenshot.png')) {
      fs.unlinkSync('screenshot.png');
  }
    exec('scrot -u -f screenshot.png', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`Screenshot taken and saved to screenshot.png`);
    });
}

module.exports = {
    screenshot
}

