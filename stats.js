var os = require("os");
const fs = require('fs/promises');
const { status } = require('./player/info')
const { currentDateForStats } = require('./date')
const streamings = require('./streamings')
const { playerIsRunning } = require('./player/monitor')
const running = true

async function writeStatusPlayer() {
  try {
    const content = await status();
    const { current } = streamings
    const channel = {
      status: current.broadcast,
      name: current.name,
      url: current.url
    }
    const arrContent = Object.values(content)
    const arrStreaming = Object.values(channel)
    playerIsRunning(streamings.current.monitor.time_pos)
    console.log('-------------------');
    console.log(streamings.current);
    console.log('-------------------');
    await fs.writeFile('/home/pi/player/status.log', arrContent + ',' + currentDateForStats() + "," + arrStreaming + os.EOL , { flag: 'a+' } );
  } catch (err) {
    console.log(err);
  }
}

async function delay(ms) {
  return await new Promise(resolve => setTimeout(resolve, ms));
}

async function run(){
  await delay(30000)
  await writeStatusPlayer()
}

async function loopStatus(){
  while (running) {
    await run()
  }
}

module.exports = {
  loopStatus
}