var exec = require('child_process').exec;

//function to restart rpi
module.exports = function shutdown(callback){
	exec('sudo /sbin/shutdown -r now', function(error, stdout, stderr){
                console.log(`Reiniciando el dispositivo`);
                callback(stdout);
        });
}