require('dotenv').config({ path: '~/player/.env'})

const connection_broker = {
    server : process.env.SERVERBROKER,
    portBroker : process.env.PORTBROKER,
    usernameBroker : process.env.USERNAME,
    passwordBroker : process.env.PASSWORD,
}

const customer = {
    name: process.env.CLIENT
}

module.exports ={
    connection_broker,
    customer,
}