async function doPublish(client){
    try {
        await client.publish("wc/player", "It works!");
    } catch (e){
        console.log(e.stack);
        process.exit();
    }
}

module.exports = {
    doPublish
}
