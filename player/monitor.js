const streamings  = require('../streamings')

let data_streaming = {
    raw_player: 0,
    time_player : 0,
    time_pos_previous : 0,
    count_closed_mediaplayer : 0
}

function streamingStarted(data){
    setTimeout(() => {
        if(data.value === 0 || data.value === false){
            streamings.current.broadcast = false
            streamings.current.message = 'Url of broadcast not available'
            console.log(streamings.current);
        }else{
            streamings.current.broadcast = true
            console.log(streamings.current);
        }
    }, 5000); 
}

function playerIsRunning(time_pos){
    if (time_pos >= streamings.current.previous_time_pos){
        console.log(`[ Player is running ]`);
        streamings.current.previous_time_pos = time_pos
        if (!streamings.current.broadcast){
            streamings.current.broadcast = true
        }
        console.log(`[ Running player: current Time: ${time_pos} - previous Value: ${streamings.current.previous_time_pos}]`);
    }else{
        console.log(`[ Player stop the streaming]`);
        if (streamings.current.broadcast){
            streamings.current.broadcast = false
        }
    }
}

module.exports = {
    data_streaming,
    streamingStarted
}