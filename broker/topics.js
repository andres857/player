const {customer} = require('../config')
const {serial} = require('../utils')

async function buildTopics(){
    const idPlayer = await serial()
    return {
        suscriber:{
          players: `${customer.name}/players`, //request global to all players
          player: `${customer.name}/player/${idPlayer}`, //request to player
        },
        publish:{
          status: `${customer.name}/player/status/${idPlayer}`,
          response: `${customer.name}/player/response/${idPlayer}`,
          currentStreaming: `${customer.name}/player/currentstreaming/${idPlayer}`
        }
    }
}

module.exports={
  buildTopics,
}