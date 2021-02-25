let YoutubeMp3Downloader = require("youtube-mp3-downloader");

let Downloader = function() {

    let self = this;

    //Configure YoutubeMp3Downloader with your settings
    self.YD = new YoutubeMp3Downloader({
        "ffmpegPath": "react-native-ffmpeg",        // FFmpeg binary location
        "queueParallelism": 2,                  // Download parallelism (default: 1)
        "progressTimeout": 2000                 // Interval in ms for the progress reports (default: 1000)
    });

    self.callbacks = {};

    self.YD.on("finished", function(error, data) {

        if (self.callbacks[data.videoId]) {
            self.callbacks[data.videoId](error, data);
        } else {
            console.log("Error: No callback for videoId!");
        }

    });

    self.YD.on("error", function(error, data) {

        console.error(error + " on videoId " + data.videoId);

        if (self.callbacks[data.videoId]) {
            self.callbacks[data.videoId](error, data);
        } else {
            console.log("Error: No callback for videoId!");
        }

    });

};

Downloader.prototype.getMP3 = function(track, callback){

    let self = this;


    self.callbacks[track.videoId] = callback;

    self.YD.download(track.videoId, track.name);

};

module.exports = Downloader;
