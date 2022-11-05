const MQTT = require("async-mqtt");
const {connection_broker} = require("../config")

let client = null

async function connectBroker(serial) {
    try {
      if(!client){
        client = await MQTT.connectAsync(`tcp://${connection_broker.server}`,{
            clientId: serial,
            port: connection_broker.portBroker,
            username: connection_broker.usernameBroker,
            password: connection_broker.passwordBroker,
            keepalive:60,
            clean:true,
            reconnectPeriod: 10000,
            connectTimeout:4000,
            resubscribeOnReconnect: true
        })}
        console.log('[ BROKER - connection successfull to broker ]');
        return client
    } catch (error) {
      console.log(`[ BROKER - error connecting to broker - ${error}]`);
    }
}

module.exports = {
  connectBroker
}