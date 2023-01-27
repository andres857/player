const Wifi = require('rpi-wifi-connection');
const {player} = require('./config')
const wifiNetworks = new Wifi();


function strenghtWifiSgnal(nameNetwork, networks){
    const myNetwork = networks.find(network => network.ssid === nameNetwork)
    if (!myNetwork){
        return 'network not found'
    }
    return myNetwork
}

wifiNetworks.getState().
    then((connected) => {
        if (connected)        
            console.log('Connected to network');
        else
            console.log('Not connected to network.');
        return wifiNetworks
    }).then( );


    wifiNetworks.getStatus().then((status) => {
        console.log(status);
    }))
    .catch((error) => {
        console.log(error);
}

wifiNetworks.scan().then((ssids) => {
    // console.log(ssids);
    const network = strenghtWifiSgnal(player.ssid,ssids)
    console.log(network);
})
.catch((error) => {
    console.log(error);
});