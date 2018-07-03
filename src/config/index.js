const fs = require('fs');
const dev = process.env.NODE_ENV !== 'production';
const path = dev ? __dirname + '/config.json' : process.cwd() + '/config.json';

if (!fs.existsSync(path)) {
    console.log("[CONFIG] No config file found! Writing one...");

    const initialConfig = '{"application": {"logLevel": "info", "port": 3001, "host": "127.0.0.1", "operationMode": 1, "spotifyLowVolume": 15}}';
    fs.writeFileSync(path, initialConfig);

    console.log('[CONFIG] Config file saved!');
}

module.exports = eval('require')(path);
