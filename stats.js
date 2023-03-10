import os from "os"
import fs from "fs/promises"
import Device from "./player/info.js"
import { currentDateForStats } from "./date.js"
import streamings from "./streamings.js"
import { playerIsRunning } from "./player/monitor.js"

const running = true

const player = new Device()
async function writeStatusPlayer() {
  try {
    const content = await player.status();
    const connectionType = await player.connectionTypeUse();
    let strenghtWifi = 'n/a'
    if (connectionType === "wlan0") {
      strenghtWifi = await player.strenghtWifiSignal();
    }

    const { current } = streamings
    const channel = {
      status: current.broadcast,
      name: current.name,
      openplayer: current.monitor.openplayer
      // url: current.url
    }
    const arrContent = Object.values(content)
    const arrStreaming = Object.values(channel)
    playerIsRunning(streamings.current.monitor.time_pos)
    let { username } = player.system()
    let datestats = currentDateForStats() 
    await fs.writeFile(`/home/${username}/player/status.log`, datestats + "," + arrContent + "," + connectionType + "," + strenghtWifi + "," + arrStreaming + os.EOL , { flag: 'a+' } );
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

export {
  loopStatus
}