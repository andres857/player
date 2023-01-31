const os = require("os");
const fs = require('fs/promises');
const Device = require('./player/info')
const { currentDateForStats } = require('./date')
const streamings = require('./streamings')
const { playerIsRunning } = require('./player/monitor')
const running = true

const player = new Device()
async function writeStatusPlayer() {
  try {
    const content = await player.status();
    const { current } = streamings
    const channel = {
      status: current.broadcast,
      name: current.name,
      url: current.url
    }
    const arrContent = Object.values(content)
    const arrStreaming = Object.values(channel)
    playerIsRunning(streamings.current.monitor.time_pos)
    let { username } = player.system()
    await fs.writeFile(`/home/${username}/player/status.log`, arrContent + ',' + currentDateForStats() + "," + arrStreaming + os.EOL , { flag: 'a+' } );
  } catch (err) {
    console.log(err);
  }
}

async function delay(ms) {
  return await new Promise(resolve => setTimeout(resolve, ms));
}

async function run(){
  await delay(600000)
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