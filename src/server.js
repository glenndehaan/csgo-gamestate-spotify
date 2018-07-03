const http = require('http');
const exec = require('child_process').exec;
const SpotifyWebHelper = require('spotify-web-helper');
const loudness = require('loudness');
const config = require('./config');

/**
 * Check if we are using the dev version
 */
const dev = process.env.NODE_ENV !== 'production';

/**
 * Init logger and set log level
 */
global.log = require('simple-node-logger').createSimpleLogger({
    logFilePath: `${dev ? __dirname : process.cwd()}/csgo-gamestate-spotify.log`,
    timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS',
});
global.log.setLevel(config.application.logLevel);

/**
 * Create a new Spotify helper
 */
const spotifyHelper = SpotifyWebHelper();

/**
 * Global vars
 * @type {boolean}
 */
let spotifyReady = false;
let isPlaying = false;
let systemDefaultVolume = 0;

/**
 * Create new HTTP server
 */
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});

    req.on('data', (data) => {
        try {
            global.log.trace(JSON.parse(data.toString()));

            generalProcessData(JSON.parse(data.toString()));
        } catch (e) {
            global.log.error(`[WEBDATA] Error retrieving data from API: ${e}`)
        }
    });

    req.on('end', () => {
        res.end('');
    });
});

/**
 * Function to check if the right information exists so we can start or stop the music
 * @param data
 */
function generalProcessData(data) {
    if (!data.previously && !data.player) return;

    if ((data.player && data.player.activity === 'menu') || (data.player.state.health === 0 || data.player.steamid !== data.provider.steamid) || (data.round && data.round.phase !== "live")) {
        // Let's play some music
        if (spotifyReady) {
            if (config.application.operationMode === 1) {
                if (!isPlaying) {
                    global.log.info(`[CS::GO] Let's start some music`);
                    spotifyHelper.player.play();
                    isPlaying = true;
                }
            } else if (config.application.operationMode === 2) {
                global.log.trace("[CS::GO] Started getting system volume");

                loudness.getVolume((err, vol) => {
                    if(err) {
                        global.log.error(`[LOUDNESS] Error: ${err}`);
                        return;
                    }

                    systemDefaultVolume = vol;

                    loudness.setVolume(0, (err) => {
                        if(err) {
                            global.log.error(`[LOUDNESS] Error: ${err}`);
                            return;
                        }

                        global.log.info(`[CS::GO] Let's start some music`);
                        spotifyHelper.player.play();
                        isPlaying = true;

                        global.log.info(`[CS::GO] Let's turn up the volume to ${systemDefaultVolume}%`);
                        for(let i = 0; i < systemDefaultVolume; i++) {
                            loudness.setVolume(i);
                        }
                    });
                });
            }
        } else {
            global.log.warn(`[SPOTIFY] Isn't ready to handle requests`);
        }
    } else {
        // Let's be serious so quit the music
        if (spotifyReady) {
            if (config.application.operationMode === 1) {
                if (isPlaying) {
                    global.log.info(`[CS::GO] Stop the music`);
                    spotifyHelper.player.pause();
                    isPlaying = false;
                }
            } else if (config.application.operationMode === 2) {
                if (isPlaying) {
                    global.log.info(`[CS::GO] Stop the music`);
                    spotifyHelper.player.pause();
                    isPlaying = false;
                }
            }
        } else {
            global.log.warn(`[SPOTIFY] Isn't ready to handle requests`);
        }
    }
}

/**
 * Event to check if there is a Spotify error
 */
spotifyHelper.player.on('error', () => {
    global.log.error(`[SPOTIFY] Error where is your Spotify!`);
});

/**
 * Event triggered when Spotify is ready
 */
spotifyHelper.player.on('ready', () => {
    // Get current Spotify status
    global.log.trace(`[SPOTIFY] helper.status ${JSON.stringify(spotifyHelper.status)}`);
    global.log.trace(`[SPOTIFY] helper.status.playing ${spotifyHelper.status.playing}`);

    global.log.info(`[SPOTIFY] Ready to handle events... Let's start some initial music`);
    spotifyReady = true;

    // Start playing if we aren't playing yet
    if (!spotifyHelper.status.playing) {
        spotifyHelper.player.play();
        isPlaying = true;
    }
});

/**
 * Event when Spotify is played
 */
spotifyHelper.player.on('play', () => {
    global.log.info(`[SPOTIFY] Is now playing music`);
});

/**
 * Event when Spotify is paused
 */
spotifyHelper.player.on('pause', () => {
    global.log.info(`[SPOTIFY] Is now pausing music`);
});

/**
 * Start listening on the right port/host for the HTTP server
 */
server.listen(config.application.port, config.application.host);
global.log.info(`[SYSTEM] Monitoring CS:GO on: ${config.application.host}:${config.application.port}`);
