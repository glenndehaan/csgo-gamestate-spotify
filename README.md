# Counter-Strike Global Offensive Game State Spotify

Want to hear you CS sounds but also listen to music. This is the answer.
After you died in CS we start playing music from spotify until you need to play.

## Structure
- ES6
- NodeJS
- Spotify Web Helper
- Simple Node Logger

## Normal Usage
- Download the `csgo-gamestate-spotify-win.exe` file from GitHub in the build folder
- Download the `gamestate_integration_glennserver_spotify.cfg` file from GitHub in the cfg folder
- Copy the `gamestate_integration_glennserver_spotify.cfg` file to your `C:\Program Files (x86)\Steam\steamapps\common\Counter-Strike Global Offensive\csgo\cfg` folder
- Open up Spotify
- Open the `csgo-gamestate-spotify-win.exe` file

Then open up CS::GO and start playing after you died we will play your music from Spotify.

## Development Usage
- Download the project from GitHub
- Install NodeJS 8.0 or higher
- Copy the `gamestate_integration_glennserver_spotify.cfg` file to your `C:\Program Files (x86)\Steam\steamapps\common\Counter-Strike Global Offensive\csgo\cfg` folder
- Open up Spotify
- Run `npm install` in the root project folder
- Run `npm start` in the root project folder

Then open up CS::GO and start playing after you died we will play your music from Spotify.

## Logging
All logs will be written to the `csgo-gamestate-spotify.log` file in the node folder.

## TODO
- Create GUI (@ChrisEKN)
- Fix Operation mode 2

## License

MIT
