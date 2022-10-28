const { run } = require('./index')

async function doPublish(){
    const client = await run()
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
