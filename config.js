import dotenv from 'dotenv'
dotenv.config({ path: '~/player/.env' });

const connection_broker = {
    server : process.env.SERVER_BROKER,
    portBroker : process.env.PORT_BROKER,
    usernameBroker : process.env.USERNAME_BROKER,
    passwordBroker : process.env.PASSWORD_BROKER,
}

const channels = {
    institucional: process.env.URL_STREAMING_INSTITUCIONAL,
    comercial: process.env.URL_STREAMING_COMERCIAL,
    closeStreaming_request: false,
}

const customer = {
    name: process.env.CLIENT,
}

const systemInfo = {
    username: process.env.USERNAME || 'mediaplayer',
    ssid: process.env.SSID_WIFI || null,
}

const debug = process.env.DEBUG || 'false';

export {
    connection_broker,
    channels,
    customer,
    systemInfo,
    debug
}