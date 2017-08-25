module.exports = {
    application: {
        logLevel: 'info', // trace, debug, info, warn, error or fatal
        port: 3001,
        host: "127.0.0.1",
        operationMode: 1, // 1 = When you need to play we pause the music / 2 = When you need to play we will lower the volume to some percentage (Windows only!!)
        spotifyLowVolume: 5 // %
    }
};
