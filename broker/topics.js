const {serialPlayer} = require('../player/idplayer')

async function buildTopics(){
    let id = await serialPlayer()
    return {
        suscriber:{
          channel:`player/streaming`,
          restart:`player/restart`,
          request:`player/request/${id}`,
        },
        publish:{
          status: `player/status/${id}`,
          response: `player/response/${id}`,
          currentStreaming: `player/currentstreaming/${id}`
        }
    }
}

module.exports={
  buildTopics,
}
