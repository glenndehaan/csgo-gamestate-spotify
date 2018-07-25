# Counter-Strike Global Offensive Game State Spotify

Want to hear you CS sounds but also listen to music. This is the answer.
After you died in CS we start playing music from spotify until you need to play.

## Structure
- ES6
- NodeJS
- RobotJS
- Electron
- Preact

## Normal Usage
### Windows
- Download the `CSGO GameState Spotify-win32-x64.zip` file from GitHub in the build folder
- Unzip the file in a folder of your choice
- Download the `gamestate_integration_glennserver_spotify.cfg` file from GitHub in the cfg folder
- Copy the `gamestate_integration_glennserver_spotify.cfg` file to your `C:\Program Files (x86)\Steam\steamapps\common\Counter-Strike Global Offensive\csgo\cfg` folder
- Open up Spotify NOTE: Keep Spotify paused
- Open the `GameState.exe` file inside the folder you unzipped earlier

Then open up CS::GO and start playing after you died we will play your music from Spotify.

### MacOS
- Download the `CSGO GameState Spotify-darwin-x64.zip` file from GitHub in the build folder
- Unzip the file in a folder of your choice
- Move the `CSGO GameState Spotify.app` to your applications folder
- Download the `gamestate_integration_glennserver_spotify.cfg` file from GitHub in the cfg folder
- Copy the `gamestate_integration_glennserver_spotify.cfg` file to your `/Library/Application Support/Steam/SteamApps/common/Counter-Strike Global Offensive/csgo/cfg` folder
- Open up Spotify NOTE: Keep Spotify paused
- Open the `CSGO GameState Spotify.app` file inside your applications folder

Then open up CS::GO and start playing after you died we will play your music from Spotify.

## Development Usage
- Download the project from GitHub
- Install NodeJS 8.0 or higher
- Copy the `gamestate_integration_glennserver_spotify.cfg` file to your `C:\Program Files (x86)\Steam\steamapps\common\Counter-Strike Global Offensive\csgo\cfg` folder
- Open up Spotify NOTE: Keep Spotify paused
- Run `npm install` in the root project folder
- Run `npm run electron:rebuild` in the root project folder
- Run `npm run webpack` in the root project folder
- Run `npm start` in the root project folder

Then open up CS::GO and start playing after you died we will play your music from Spotify.

## Building
NOTE: You can only build the platform you are developing on. So you can't build the MacOS version if you are running Windows.

### Windows
- Make sure you have the development version running
- Open a PowerShell window in Administrator mode and run `npm install --global --production windows-build-tools`
- Run `npm run build:win` in the root project folder
- The output will be available in the `build` folder

### MacOS
- Make sure you have the development version running
- Run `npm run build:macos` in the root project folder
- The output will be available in the `build` folder

## TODO
- Auto extract CFG to CSGO folder

## License

MIT
