const http = require('http');
const fs = require('fs');
const log = require('simple-node-logger').createSimpleLogger('csgo-gamestate-spotify.log');
const SpotifyWebHelper = require('spotify-web-helper');
const config = require('./config');

/**
 * Create a new Spotify helper
 */
const spotifyHelper = SpotifyWebHelper();

/**
 * Set log level from config
 */
log.setLevel(config.application.logLevel);

/**
 * Global vars
 * @type {boolean}
 */
let spotifyReady = false;
let isPlaying = false;

/**
 * Create new HTTP server
 */
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});

    req.on('data', (data) => {
        try {
            log.trace(JSON.parse(data.toString()));

            generalProcessData(JSON.parse(data.toString()));
        } catch (e) {
            log.error(`[WEBDATA] Error retrieving data from API: ${e}`)
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

    if ((data.player && data.player.activity === 'menu') || (data.player.state.health === 0 || data.player.steamid !== data.provider.steamid)) {
        // Let's play some music
        if (spotifyReady) {
            if (!isPlaying) {
                log.info(`[CS::GO] Let's start some music`);
                spotifyHelper.player.play();
                isPlaying = true;
            }
        } else {
            log.warn(`[SPOTIFY] Isn't ready to handle requests`);
        }
    } else {
        // Let's be serious so quit the music
        if (spotifyReady) {
            if (isPlaying) {
                log.info(`[CS::GO] Stop the music`);
                spotifyHelper.player.pause();
                isPlaying = false;
            }
        } else {
            log.warn(`[SPOTIFY] Isn't ready to handle requests`);
        }
    }
}

/**
 * Event to check if there is a Spotify error
 */
spotifyHelper.player.on('error', () => {
    log.error(`[SPOTIFY] Error where is your Spotify!`);
});

/**
 * Event triggered when Spotify is ready
 */
spotifyHelper.player.on('ready', () => {
    // Get current Spotify status
    log.trace(`[SPOTIFY] helper.status ${spotifyHelper.status}`);
    log.trace(`[SPOTIFY] helper.status.playing ${spotifyHelper.status.playing}`);

    log.info(`[SPOTIFY] Ready to handle events... Let's start some initial music`);
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
    log.info(`[SPOTIFY] Is now playing music`);
});

/**
 * Event when Spotify is paused
 */
spotifyHelper.player.on('pause', () => {
    log.info(`[SPOTIFY] Is now pausing music`);
});

/**
 * Start listening on the right port/host for the HTTP server
 */
server.listen(config.application.port, config.application.host);
log.info(`[SYSTEM] Monitoring CS:GO on: ${config.application.host}:${config.application.port}`);
