require('dotenv').config({ path: '~/player/.env'})
const mqtt = require('mqtt')
const {serial} = require('../player/info') 

const serverBroker = process.env.SERVERBROKER
const portBroker = process.env.PORTBROKER
const usernameBroker = process.env.USERNAME
const passwordBroker = process.env.PASSWORD

const clientMQTT  = mqtt.connect(`mqtt://${serverBroker}`,{
  clientId: serial(),
  port: portBroker,
  username: usernameBroker,
  password: passwordBroker,
  keepalive:60,
  clean:true,
  reconnectPeriod: 10000,
  connectTimeout:4000,
  resubscribeOnReconnect: true
})

clientMQTT.on('connect', function () {
    console.log(`[ BROKER - Player connection successfull to broker ]`);
  })

module.exports = clientMQTT


