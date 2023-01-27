require('dotenv').config({ path: '~/player/.env'})

const connection_broker = {
    server : process.env.SERVERBROKER,
    portBroker : process.env.PORTBROKER,
    usernameBroker : process.env.USERNAME,
    passwordBroker : process.env.PASSWORD,
}

const channels = {
    institucional: process.env.URL_STREAMING_INSTITUCIONAL,
    comercial: process.env.URL_STREAMING_COMERCIAL,
}

const customer = {
    name: process.env.CLIENT
}
const player = {
    hostname: process.env.HOSTNAME,
    ssid: process.env.SSID_WIFI,
    serial: ''
}

module.exports ={
    connection_broker,
    channels,
    customer,
    player
}