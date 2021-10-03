const player = require('../player/system')

async function buildTopics(){

    let id = await player.serial()
    const topics = {
        suscriber:{
          channel:`player/channel`,
          restart:`player/restart`,
          request:`player/${id}/request`,
        },
        publish:{
          status: `player/${id}/status`,
          response: `player/${id}/response`,
          currentStreaming: `player/${id}/streaming`
        }
    }
    return topics
}

module.exports={
    buildTopics,
}
