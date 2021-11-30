require('dotenv').config({ path: '~/player/.env'})
const {serialPlayer} = require('../player/idplayer')

const client = process.env.CLIENT

async function buildTopics(){
    let id = await serialPlayer()
    return {
        suscriber:{
          streaming:`${client}player/streaming`,
          restart:`${client}player/restart`,
          request:`${client}player/request/${id}`,
        },
        publish:{
          status: `${client}player/status/${id}`,
          response: `${client}player/response/${id}`,
          currentStreaming: `${client}player/currentstreaming/${id}`
        }
    }
}

module.exports={
  buildTopics,
}
