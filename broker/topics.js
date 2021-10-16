const player = require('../player/system')

async function buildTopics(){
    let id = await player.serial()
    const topics = {
        suscriber:{
          channel:`player/streaming`,
          restart:`player/restart`,
          request:`player/request/${id}`,
        },
        publish:{
          status: `player/status/${id}`,
          response: `player/response/${id}`,
          currentStreaming: `player/cstreaming/${id}`
        }
    }
    return topics
}

module.exports={
    buildTopics,
}
