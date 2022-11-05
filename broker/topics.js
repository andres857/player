const { customer } = require('../config')

async function buildTopics(serial){
    return {
        suscriber:{
          players: `${customer.name}/players`, //request global to all players
          player: `${customer.name}/player/${serial}`, //request to player
        },
        publish:{
          status: `${customer.name}/player/status/${serial}`,
          response: `${customer.name}/player/response/${serial}`,
          currentStreaming: `${customer.name}/player/currentstreaming/${serial}`
        }
    }
}

module.exports={
  buildTopics,
}
